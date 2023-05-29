import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
interface Room {
  [roomId: string]: string[]; // Array of socket IDs
}

const rooms: Room = {};

export function createSocketServer(io: Server) {
  console.log("Ando aqui");
  console.log("io:    " + io);
  io.on("connection", (socket) => {
    console.log("connection");

    socket.on("join room", (roomID) => {
      console.log("join room");

      if (rooms[roomID]) {
        console.log("RoomId: " + roomID);
        console.log("SocketID: " + socket.id);
        rooms[roomID].push(socket.id);
        console.log("rooms[roomID].push(socket.id): " + rooms[roomID]);
      } else {
        console.log("Initiating peer create a new room");
        rooms[roomID] = [socket.id];
        console.log("RoomIDelse: " + roomID);
      }

      const otherUser = rooms[roomID].find((id) => id !== socket.id);
      console.log("OtherUser: " + otherUser);

      if (otherUser) {
        socket.emit("other user", otherUser);
        socket.to(otherUser).emit("user joined", socket.id);
        console.log("Emitted");
      }
    });

    socket.on("offer", (payload) => {
      console.log("Offers connection");
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      console.log("Accepts");
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming) => {
      console.log("ICE");
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
  });

  server.listen(9000, () =>
    console.log("Server is up and running on Port 9000")
  );
}
