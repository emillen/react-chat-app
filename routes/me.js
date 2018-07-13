import express from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import mongoose from "mongoose";
import Promise from "bluebird";

const router = express.Router();

router.get("/chats", (req, res) => {
  User.findOne({ _id: new mongoose.Types.ObjectId(req.decoded.id) })
    .populate({
      path: "chats",
      model: Chat,
      select: "-messages"
    })
    .exec()
    .then(user => {
      if (!user) return Promise.reject();
			return user;
    })
    .then(user => {
      if (!user.chats) return res.status(200).send([]);
      res.status(200).send(user.chats);
    })
    .catch(err => {
      res.status(500).send({ message: "Unable to find chats" });
    });
});

router.post("/chats", (req, res) => {
  const userId = req.decoded.id;
  const chatId = req.body.chat;
  if (req.body.chat) {
    Promise.all([
      User.findOne({ _id: new mongoose.Types.ObjectId(userId) }),
      Chat.findOne({ _id: new mongoose.Types.ObjectId(chatId) })
    ])
      .then(([user, chat]) => {
        if (!chat) res.status(500).send({ message: "Chat could not be found" });
        if (!user) res.status(401).send({ message: "User not found" });
        return [user, chat];
      })
      .then(([user, chat]) => {
        if (!user.chats) user.chats = [];
        if (!chat.users) chat.users = [];
        if (!user.chats.includes(chatId)) user.chats.push(chat._id);
        if (!chat.users.includes(userId)) chat.users.push(user._id);

        return Promise.all([user.save(), chat.save()]);
      })
      .then(() => {
        res.status(200).send({ message: "chat added" });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
  }
});

export default router;
