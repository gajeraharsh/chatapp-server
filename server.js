import express from "express";
const app = express();
import Socketio from "socket.io";
import http from "http";
const server = http.createServer(app);
const io = Socketio(server, { cors: { origin: "*" } });
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
import { AddUser, RemoveUser, GetUser } from "./src/Helper/SocketController";
//db connection
mongoose
  .connect(process.env.CONN, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection SuccessFull"))
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json());
app.use(express.static("uplodes"));
app.use(cors());
//Routing
app.use("/api/", require("./src/Rotuers/User"));
app.use("/api/auth/", require("./src/Rotuers/Auth"));
app.use("/api/conversation/", require("./src/Rotuers/Messages"));
app.use("/api/group/", require("./src/Rotuers/Group"));

// socket io realtime code

io.on("connection", (Socket) => {
  console.log("connnected ");
  // Add User

  Socket.on("addUser", (userid) => {
    AddUser(userid, Socket.id);
    io.emit("getUser", userid);
  });
  // Send Message Instant
  Socket.on("SendMessage", (data, cb) => {
    const User = GetUser(data.ReciverId);
    if (User) {
      io.to(User.Socketid).emit("Recivemsg", data);
    }

    cb(data);
  });

  Socket.on("NewRoom", (roomid) => {
    Socket.join(roomid);
  });

  Socket.on("SendMessagegroup", (roomid, Message) => {
    Socket.to(roomid).emit(Message);
  });

  Socket.on("disconnect", () => {
    // console.log("disconnect")
    RemoveUser(Socket.id);
  });
});

// Server Listming
server.listen(process.env.PORT, () => {
  console.log(`Server is running port nomber ${process.env.PORT}`);
});
