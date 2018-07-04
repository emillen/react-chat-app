import ioModule from "socket.io";
import Promise from "bluebird";
import jwtModule from "jsonwebtoken";
import Chat from "./models/Chat";
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

    if (socket.handshake.query.chat) {
      const chatId = socket.handshake.query.chat;
      const userId = socket.decoded.id;
      Chat.find({ id: new ObjectId(chatId) })
        .then(() => socket.join(chatId))
				.catch(err => console.log(err));
      socket.on("message", message => {
        io.in(chatId).emit("message", {message, from: userId});
      });
      socket.on("disconnect", () => {
        socket.leave(chatId);
      });
    }
  });
};

export default setupIo;
