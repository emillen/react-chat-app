import Promise from "bluebird";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { io } from "../io";
import Chat from "../models/Chat";
import Message from "../models/Message";
import User from "../models/User";

const verify = Promise.promisify(jwt.verify);
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.post("/", (req, res) => {
  if (!req.body.name || req.body.name.length < 5)
    return res.status(400).send({ message: "Name is not long enough." });

  const token = req.headers["x-access-token"];
  verify(token, "asdasd")
    .then(decoded => User.findOne({ _id: new ObjectId(decoded.id) }))
    .then(user => {
      const chat = new Chat({
        name: req.body.name,
        createdBy: new ObjectId(user._id)
      });
      chat.users.push(user._id);
      user.chats.push(chat._id);
      return Promise.all([user.save(), chat.save()]);
    })
    .then(([_, chat]) => {
      res.status(200).send({ added: true, message: "Chat added", chat: chat });
    })
    .catch(err => {
      console.dir(err);
      res.status(500).send({ err: true, message: "Chat already exists" });
    });
});

router.get("/", (req, res) => {
  const regexp = new RegExp(req.query.search, "i");
  const query = { name: regexp };
  req.query.filter === "joined" &&
    (query.users = {
      $not: { $elemMatch: { $eq: new ObjectId(req.decoded.id) } }
    });
  Chat.find(query)
    .select(["name", "_id"])
    .then(chats => {
      res.status(200).send(chats);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: true, message: "internal server error" });
    });
});

router.get("/:id", (req, res) => {
  Chat.findOne({ _id: new ObjectId(req.params.id) })
    .populate({
      path: "messages",
      populate: { path: "user", model: User }
    })
    .exec()
    .then(chat => {
      res.status(200).send(chat);
    })
    .catch(err =>
      res.status(500).send({ error: true, message: "Unknown server error" })
    );
});

router.post("/:id", (req, res) => {
  if (req.params.id && req.params.id.length >= 10 && req.body.message)
    Chat.findOne({ _id: new ObjectId(req.params.id) })
      .then(chat => {
        const messageObject = new Message({
          text: req.body.message,
          user: new ObjectId(req.decoded.id)
        });

        return Promise.all([chat, messageObject.save()]);
      })
      .then(([chat, messageObject]) => {
        chat.messages.push(messageObject);
        chat.save();
        return messageObject.populate("user").execPopulate();
      })
      .then(messageObject => {
        res.status(201).send({ added: true });
        io.in(req.params.id).emit("message", messageObject);
      })
      .catch(err => console.log(err));
});

export default router;
