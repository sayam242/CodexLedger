import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { getCurrentUser } from "../auth/services/auth.service";

let io: Server | null = null;
const userSockets = new Map<string, Set<string>>();

export function initSocketManager(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        process.env.EXTENSION_SOURCE_URL || "https://leetcode.com",
        `chrome-extension://${process.env.EXTENSION_ID}`,
      ],
      credentials: true,
    },
  });

  io.use(async (socket: Socket, next) => {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((c) => c.startsWith("codexLedger_session="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const user = await getCurrentUser(token);
    if (!user) {
      return next(new Error("Authentication error"));
    }

    socket.data.userId = user.id;
    next();
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId as string;

    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId)!.add(socket.id);

    console.log(`Socket connected: ${socket.id} (user: ${userId})`);

    socket.on("disconnect", () => {
      const sockets = userSockets.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          userSockets.delete(userId);
        }
      }
      console.log(`Socket disconnected: ${socket.id} (user: ${userId})`);
    });
  });

  console.log("Socket.IO manager initialized");
}

export function emitToUser(userId: string, event: string, data?: unknown) {
  const sockets = userSockets.get(userId);
  if (!sockets || !io) return;

  for (const socketId of sockets) {
    io.to(socketId).emit(event, data);
  }
}

export function getIO(): Server | null {
  return io;
}
