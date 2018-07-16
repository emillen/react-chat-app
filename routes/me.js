import express from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import Subscription from "../models/Subscription";
import mongoose from "mongoose";
import Promise from "bluebird";

const router = express.Router();

router.get("/chats", (req, res) => {
  Subscription.find({ user: req.decoded.id })
    .populate({
      path: "chat",
      model: Chat,
      select: "-messages"
    })
    .exec()
    .then(subs => {
      res.status(200).send(
        subs.map(sub => {
					const subobj = sub.toObject()
					subobj.chat.lastViewed = subobj.lastViewed;
          return subobj.chat;
        })
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Unknown server error" });
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
        const subscription = new Subscription({ user, chat });
        return subscription.save();
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
