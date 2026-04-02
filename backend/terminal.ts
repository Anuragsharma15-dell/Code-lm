// src/terminal.ts
import { WebSocketServer, WebSocket } from "ws";
import * as pty from "node-pty";
import { IncomingMessage } from "http";

export function setupTerminalWSS(server: import("http").Server) {
  const wss = new WebSocketServer({ server, path: "/terminal" });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const shell = process.platform === "win32" ? "powershell.exe" : "bash";

    const ptyProcess = pty.spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: process.env.HOME,
      env: process.env as Record<string, string>,
    });

    // PTY → browser
    ptyProcess.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });

    // browser → PTY
    ws.on("message", (msg) => {
      try {
        const parsed = JSON.parse(msg.toString());

        if (parsed.type === "input") {
          ptyProcess.write(parsed.data);
        } else if (parsed.type === "resize") {
          ptyProcess.resize(parsed.cols, parsed.rows);
        } else if (parsed.type === "run") {
          // Run Monaco editor code as a Node.js script
          ptyProcess.write(`node -e ${JSON.stringify(parsed.code)}\r`);
        }
      } catch {
        // raw input fallback
        ptyProcess.write(msg.toString());
      }
    });

    ws.on("close", () => ptyProcess.kill());
  });

  console.log("Terminal WSS ready at /terminal");
}