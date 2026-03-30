import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo, useState, useEffect } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "xterm/css/xterm.css";

function App() {
  const editorRef = useRef(null);
  const terminalRef = useRef(null);

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

  // ✅ TERMINAL SETUP (FIXED)
  useEffect(() => {
    if (!username) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: "#0a0a0a",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();
    term.focus();

    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      term.writeln("\x1b[1;32mWelcome to Code-lm Terminal 🚀\x1b[0m");
    };

    socket.onmessage = (e) => {
      term.write(e.data);
    };

    term.onData((data) => {
      socket.send(data);
    });

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      socket.close();
      term.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [username]);

  // ✅ YJS COLLAB
  useEffect(() => {
    if (username) {
      const provider = new SocketIOProvider("/", "monaco", ydoc, {
        autoConnect: true,
      });

      provider.awareness.setLocalStateField("user", { username });

      const updateUsers = () => {
        const states = Array.from(provider.awareness.getStates().values());
        setUsers(
          states
            .filter((s) => s.user && s.user.username)
            .map((s) => s.user)
        );
      };

      updateUsers();
      provider.awareness.on("change", updateUsers);

      const handleBeforeUnload = () => {
        provider.awareness.setLocalStateField("user", null);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        provider.disconnect();
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [username]);

  // 🔐 JOIN SCREEN
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

  // 🚀 MAIN UI
  return (
    <main className="h-screen w-full bg-neutral-950 flex gap-4 p-4">
      {/* Sidebar */}
      <aside className="w-1/5 bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
        <h2 className="text-white font-semibold mb-4">Users</h2>
        <ul className="space-y-2">
          {users.map((user, i) => (
            <li
              key={i}
              className="bg-neutral-800 text-white px-3 py-2 rounded-lg text-sm"
            >
              {user.username}
            </li>
          ))}
        </ul>
      </aside>

      {/* Editor + Terminal */}
      <section className="flex-1 flex flex-col gap-4">
        {/* Editor */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-neutral-800">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// start coding..."
            theme="vs-dark"
            onMount={handleMount}
          />
        </div>

        {/* Terminal */}
        <div className="h-64 rounded-2xl border border-neutral-800 bg-black p-2 overflow-hidden">
          <div ref={terminalRef} className="h-full w-full" />
        </div>
      </section>
    </main>
  );
}

export default App;