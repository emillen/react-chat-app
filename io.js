import ioModule from "socket.io";
import Promise from "bluebird";
import jwtModule from "jsonwebtoken";
import Chat from "./models/Chat";
import User from "./models/User";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
const verify = Promise.promisify(jwtModule.verify);
export let io = {};
const setupIo = http => {
  io = ioModule(http, {'pingInterval': 2000, 'pingTimeout': 5000});

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      verify(socket.handshake.query.token, "asdasd")
        .then(decoded => {
          socket.decoded = decoded;
          return User.findOne({ _id: decoded.id });
        })
        .then(() => {
          next();
        })
        .catch(err => {
          next(new Error("Authentication error"));
        });
    } else {
      next(new Error("Authentication error"));
    }
  });
  io.on("connection", socket => {
    socket.on("join chat", chat => {
      if (chat && chat.length >= 10)
        Chat.find({ id: new ObjectId(chat) })
          .then(() => {
            if (socket.chat) socket.leave(socket.chat);
            socket.chat = chat;
            socket.join(chat);
          })
          .catch(err => console.log(err));
    });

    socket.on("disconnect", () => {
      socket.leave(socket.chat);
    });
  });
};
export default setupIo;
