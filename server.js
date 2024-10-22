const express = require("express");
const next = require("next");
const axios = require("axios");
const {
  storeMessages,
  getMessages,
  updateMessage,
} = require("./src/lib/message");
// const  {Messages}  = require("./src/lib/models");

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
  let allMessages = null;

  getMessages().then((message) => {
    allMessages = message.data;
  });

  io.on("connection", (socket) => {
    console.log("allMessages", allMessages);

    socket.on(
      "private-message",
      ({ content, fromUser, toID, fromID, messageId, toUser, fromSelf }) => {
        // storeMessages({
        //   content,
        //   messageId,
        //   fromUser,
        //   fromID,
        //   toID,
        // });
        const recipient = onlineUsers.find((user) => user.userID === toID);
        console.log("toUser", toUser);
        if (recipient) {
          io.to(toID).emit("private-message", {
            content,
            fromUser,
            messageId,
            fromID,
            toID,
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

      if (allMessages.length !== 0) {
        // const userMessages = allMessages.filter(
        //   (message) => message.toID === data.userID
        // );
        // console.log("data.userID", data);
        // console.log('userMessages',userMessages)

        allMessages.forEach((message) => {
          if (data.userID === message.toID) {
            io.to(message.toID).emit("private-message", {
              content: message.content,
              fromUser: message.fromUser,
              messageId: message.messageId,
              fromID: message.fromID,
              toID: message.toID,
              seen: message.seen,
            });
          } else if (data.userID === message.fromID) {
            io.to(message.fromID).emit("private-message", {
              content: message.content,
              fromUser: message.fromUser,
              messageId: message.messageId,
              fromID: message.fromID,
              toID: message.toID,
              seen: message.seen,
            });
          }
        });
      }
    });

    socket.on("message-seen", async ({ senderUserName, toID, messageIds }) => {
      // console.log("senderUserName", senderUserName);

      // await Messages.updateMany(
      //   { messageId: { $in: messageIds }, toID: toID },
      //   { $set: { seen: true } }
      // );
      const messageID = messageIds[messageIds.length - 1];
      await updateMessage({ toID, seen: true, messageID });
      console.log("messageIds", messageIds);

      const senderSocket = onlineUsers.find((user) => user.userID === toID);

      if (senderSocket) {
        io.to(toID).emit("message-seen", { senderUserName, messageIds });
        socket.broadcast.emit("message-seen", { senderUserName, messageIds });
      }
    });

    socket.on("offline", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
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
