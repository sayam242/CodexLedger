import { getIO } from "../../lib/socketManager";
import { handleTutorChat } from "./service";

export function initTutorSocket() {
  const io = getIO();
  if (!io) {
    console.error("Socket.IO not initialized, cannot start tutor socket handler");
    return;
  }

  io.on("connection", (socket) => {
    const userId = socket.data.userId as string;

    socket.on("tutor:chat", async (data: { submissionId: string; message: string }) => {
      if (!data.submissionId || !data.message) {
        socket.emit("tutor:error", { message: "submissionId and message are required" });
        return;
      }

      await handleTutorChat(data.submissionId, userId, data.message, socket);
    });
  });

  console.log("Tutor socket handler initialized");
}
