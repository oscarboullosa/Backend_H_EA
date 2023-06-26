import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createServer } from "http";

const corsOrigin = "*";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});
interface Room {
  [roomId: string]: string[]; // Array of socket IDs
}

const rooms: Room = {};

export function createSocketServer() {
  io.on("connection", (socket: any) => {
    socket.on("join room", (roomID: any) => {
      if (rooms[roomID]) {
        rooms[roomID].push(socket.id);
      } else {
        rooms[roomID] = [socket.id];
      }

      const otherUser = rooms[roomID].find((id) => id !== socket.id);

      if (otherUser) {
        socket.emit("other user", otherUser);
        socket.to(otherUser).emit("user joined", socket.id);
      }
    });

    socket.on("offer", (payload: any) => {
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload: any) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming: any) => {
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
  });

  httpServer.listen(3000, () =>
    console.warn("Server is up and running on Port 3000")
  );
}
