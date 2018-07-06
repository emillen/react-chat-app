import express from "express";
import Promise from "bluebird";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import User from "../models/User";
import Chat from "../models/Chat";

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
      return chat.save();
    })
    .then(chat => {
      res.status(200).send({ added: true, message: "Chat added", chat: chat });
    })
    .catch(err => {
      res.status(500).send({ err: true, message: "Chat already exists" });
    });
});

router.get("/", (_, res) => {
  Chat.find({})
    .select(["name"])
    .then(chats => res.status(200).send(chats))
    .catch(err =>
      res.status(500).send({ error: true, message: "internal server error" })
    );
});

router.get("/:id", (req, res) => {
  Chat.findOne({ _id: new ObjectId(req.params.id) })
    .populate({
      path: "messages",
      populate: { path: "user", model: User }
    })
    .exec()
    .then(chat => {
      console.log(chat);
      res.status(200).send(chat);
    })
    .catch(err =>
      res.status(500).send({ error: true, message: "Unknown server error" })
    );
});
export default router;
