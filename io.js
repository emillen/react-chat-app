import ioModule from "socket.io";
import Promise from "bluebird";
import jwtModule from "jsonwebtoken";
import Chat from "./models/Chat";
import User from "./models/User";
import Message from "./models/Message";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
const verify = Promise.promisify(jwtModule.verify);

const setupIo = http => {
  const io = ioModule(http);

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
      Chat.find({ id: new ObjectId(chat) })
        .then(() => {
          if (socket.chat) socket.leave(socket.chat);
          socket.chat = chat;
          socket.join(chat);
        })
        .catch(err => console.log(err));
    });

    socket.on("message", message => {
      if (socket.chat) {
        Chat.findOne({ _id: new ObjectId(socket.chat) })
          .then(chat => {
            const messageObject = new Message({
              text: message,
              user: new ObjectId(socket.decoded.id)
            });

            return Promise.all([chat, messageObject.save()]);
          })
          .then(([chat, messageObject]) => {
            chat.messages.push(messageObject);
            chat.save();
            return messageObject.populate("user").execPopulate();
          })
          .then(messageObject => {
            io.in(socket.chat).emit("message", messageObject);
          })
          .catch(err => console.log(err));
      }
    });

    socket.on("disconnect", () => {
      socket.leave(socket.chat);
    });
  });
};

export default setupIo;
