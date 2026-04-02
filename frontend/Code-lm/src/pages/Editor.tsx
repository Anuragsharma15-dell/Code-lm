import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo, useState, useEffect } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "xterm/css/xterm.css";

function  EditorTerminal() {
  const editorRef = useRef(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const [username, setUsername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });
  const [users, setUsers] = useState([]);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current])
    );
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    setUsername(name);
    window.history.pushState({}, "", "?username=" + name);
  };

  // Run the Monaco editor code in the terminal
  const handleRunCode = () => {
    if (!editorRef.current || !socketRef.current) return;
    const code = editorRef.current.getValue();
    socketRef.current.send(JSON.stringify({ type: "run", code }));
  };

  // TERMINAL SETUP
  useEffect(() => {
    if (!username) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      theme: {
        background: "#0a0a0a",
        foreground: "#e2e8f0",
        cursor: "#6366f1",
        selectionBackground: "#6366f140",
        black: "#0a0a0a",
        brightGreen: "#4ade80",
        green: "#22c55e",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current!);
    fitAddon.fit();
    term.focus();

    // Connect to the PTY WebSocket endpoint
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${wsProtocol}//localhost:3000/terminal`);
    socketRef.current = ws;

    ws.onopen = () => {
      term.writeln("\x1b[1;32m╔══════════════════════════════╗\x1b[0m");
      term.writeln("\x1b[1;32m║  Code-lm Terminal  🚀        ║\x1b[0m");
      term.writeln("\x1b[1;32m╚══════════════════════════════╝\x1b[0m");
      term.writeln("");
      // Send initial terminal size
      ws.send(JSON.stringify({ type: "resize", cols: term.cols, rows: term.rows }));
    };

    ws.onmessage = (e) => {
      term.write(e.data);
    };

    ws.onclose = () => {
      term.writeln("\r\n\x1b[1;31m[Connection closed]\x1b[0m");
    };

    ws.onerror = () => {
      term.writeln("\r\n\x1b[1;31m[WebSocket error — is the server running?]\x1b[0m");
    };

    // User input → PTY
    term.onData((data: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "input", data }));
      }
    });

    // Sync terminal size on resize
    const handleResize = () => {
      fitAddon.fit();
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "resize", cols: term.cols, rows: term.rows }));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ws.close();
      term.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [username]);

  // YJS COLLAB
  useEffect(() => {
    if (!username) return;

    const provider = new SocketIOProvider("/", "monaco", ydoc, { autoConnect: true });
    provider.awareness.setLocalStateField("user", { username });

    const updateUsers = () => {
      const states = Array.from(provider.awareness.getStates().values());
      setUsers(
        states.filter((s: any) => s.user?.username).map((s: any) => s.user)
      );
    };

    updateUsers();
    provider.awareness.on("change", updateUsers);

    const handleBeforeUnload = () => provider.awareness.setLocalStateField("user", null);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      provider.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username]);

  if (!username) {
    return (
      <main className="h-screen w-full bg-neutral-950 flex items-center justify-center">
        <form
          onSubmit={handleJoin}
          className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl flex flex-col gap-4"
        >
          <h1 className="text-white text-xl font-semibold">Join Session</h1>
          <input
            type="text"
            placeholder="Enter your username"
            className="p-3 rounded-lg bg-neutral-800 text-white outline-none focus:ring-2 ring-indigo-500"
            name="username"
          />
          <button className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:scale-105 transition">
            Join
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-neutral-950 flex gap-4 p-4">
      {/* Sidebar */}
      <aside className="w-1/5 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col gap-4">
        <h2 className="text-white font-semibold">Users</h2>
        <ul className="space-y-2 flex-1">
          {users.map((user: any, i) => (
            <li key={i} className="bg-neutral-800 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              {user.username}
            </li>
          ))}
        </ul>

        {/* Run Code Button */}
        <button
          onClick={handleRunCode}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-2"
        >
          ▶ Run Code
        </button>
      </aside>

      {/* Editor + Terminal */}
      <section className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex-1 rounded-2xl overflow-hidden border border-neutral-800">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// start coding...\nconsole.log('Hello from Code-lm!');"
            theme="vs-dark"
            onMount={handleMount}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              padding: { top: 16 },
            }}
          />
        </div>

        {/* Terminal */}
        <div className="h-52 rounded-2xl border border-neutral-800 bg-[#0a0a0a] p-2 overflow-hidden flex flex-col">
          <div className="flex items-center gap-1.5 px-1 pb-2 border-b border-neutral-800">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-neutral-500 text-xs font-mono">terminal</span>
          </div>
          <div ref={terminalRef} className="flex-1 w-full pt-1" />
        </div>
      </section>
    </main>
  );
}

export default EditorTerminal;