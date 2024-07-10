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
    socket.on(
      "private-message",
      ({ content, fromUserName, toID, fromID, messageId }) => {
        const recipient = onlineUsers.find((user) => user.userID === toID);
        if (recipient) {
          io.to(toID).emit("private-message", {
            content,
            fromUserName,
            messageId,
          });
        }
      }
    );

    socket.on("typing", (data) => {
      if (data.typing == true) {
        io.emit("display-typing", data);
      } else {
        io.emit("display-typing", data);
      }
    });

    socket.on("new-user-add", (data) => {
      if (!onlineUsers.some((user) => user.userID === data.userID)) {
        onlineUsers.push({
          userID: data.userID,
          name: data.name,
          socketId: socket.id,
        });
      }
      socket.join(data.userID);

      io.emit("get-users", onlineUsers);
    });

    socket.on("message-seen", ({ senderUserName, toID, messageIds }) => {
      console.log("senderUserName", senderUserName);

      const senderSocket = onlineUsers.find((user) => user.userID === toID);
      console.log("toID", toID);
      console.log("----------");

      if (senderSocket) {
        io.to(toID).emit("message-seen", { senderUserName, messageIds });
        socket.broadcast.emit("message-seen", { senderUserName, messageIds });
      }
    });

    socket.on("offline", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("onlineUsers OFFLINE METHOSD", onlineUsers);
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
