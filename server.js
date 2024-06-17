const express = require("express");
const next = require("next");
const axios = require("axios");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require("http");
const socketIO = require("socket.io");

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIO(httpServer);
  let onlineUsers = [];

  io.on("connection", (socket) => {
    // console.log("Client connected TO SOCKET");

    // socket.on("send-message", (data) => {
    //   console.log(
    //     "Recieved from API SERVER SIDE :: DATA FROM SENDER ON RECIEVER",
    //     data
    //   );
    //   io.emit("receive-message",data);
    // });

    socket.on("private-message", ({ content, to, username,fromTo }) => {
      console.log('fromTo',fromTo)
      const recipient = onlineUsers.find((user) => user.userId === to);

      if (recipient) {
        io.to(recipient.socketId).emit("private-message", {
          content,
          from: socket.id,
          username,
          fromTo
        });
      }
    });

    socket.on("new-user-add", function (data) {
      if (!onlineUsers.some((user) => user.userId === data.userId)) {
        onlineUsers.push({
          userId: data.userId,
          name: data.name,
          socketId: socket.id,
        });
      }
      socket.join(data.userId);

      console.log("onlineUsers", onlineUsers);
      io.emit("get-users", onlineUsers);
    });

    socket.on("offline", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log('onlineUsers OFFLINE METHOSD',onlineUsers)
      io.emit("get-users", onlineUsers);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
