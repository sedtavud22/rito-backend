const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const repo = require("../repository");

module.exports = function socketServer(server) {
  // app.use(express.json());
  // app.use(cors());

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`connection established via id: ${socket.id}`);
    // socket.on("online", () => {
    //   console.log("A new user has joined the chat");
    //   io.emit("joined", {
    //     success: true,
    //   });
    // });

    socket.on("join_room", (userId) => {
      console.log(`joined room ${userId}`);
      socket.join(userId);
    });

    socket.on("chat", async ({ data, userId }) => {
      console.log("chat in", data);
      const resultMessage = await repo.chat.create(data);

      io.to(userId).emit("received", resultMessage);
      console.log("emitted", resultMessage);
    });

    // socket.on("typing", (data) => {
    //   console.log(data);
    //   socket.broadcast.emit("typing", data);
    // });
    // socket.on("no_typing", (data) => {
    //   socket.broadcast.emit("no_typing", data);
    // });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
