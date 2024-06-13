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
  const users = {};

  io.on("connection", (socket) => {
    console.log("Client connected TO SOCKET");

    socket.on("send-message", (data) => {
      console.log(
        "Recieved from API SERVER SIDE :: DATA FROM SENDER ON RECIEVER",
        data
      );
      io.emit("receive-message", data);
    });

    socket.on("online", function (data) {
      console.log("a user " + data.userId + " connected");
      // saving userId to object with socket ID
      users['userId'] = data.userId;
      users["name"] = data.name;
      io.emit("connected-users", data);
    });

    socket.on('disconnect', function(){
      console.log('user ' + users[socket['userId']] + ' disconnected');
      // remove saved socket from users object
      delete users[socket['userId']];
    });
    console.log('users',users)
  });

 

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
