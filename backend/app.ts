import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import cors from "cors";
import editorRoutes from "./controller/editorcontroller.ts";
import Authrouter from "./routes/authroute.ts";
import { authmiddleware } from "./middleware/authmiddleware.ts";
import { setupTerminalWSS } from "../backend/terminal.ts";   // ← import

const app = express();

app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

// ✅ Attach terminal PTY WebSocket to the SAME http server
setupTerminalWSS(httpServer);

app.use("/editorroutes", authmiddleware, editorRoutes);
app.use("/api/auth", Authrouter);

httpServer.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});