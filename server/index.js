import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const users = [{}];

const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 4500;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);

    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `${users[socket.id]} welcome to the chat`,
    });
  });

  socket.on("message", ({ msg, id }) => {
    io.emit("sendMessage", { user: users[id], msg, id });
  });

  socket.on("disconnected", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
  });
});

app.get("/", (req, res) => {
  res.send("4500");
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
