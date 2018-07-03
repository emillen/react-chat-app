const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const ObjectId = require("mongoose").Types.ObjectId;
const verify = Promise.promisify(require("jsonwebtoken").verify);
const User = Promise.promisifyAll(require("../models/User"));
const Chat = Promise.promisifyAll(require("../models/Chat"));

router.post("/", (req, res) => {
  if (!req.body.name || req.body.name.length < 5)
    return res.status(400).send({ message: "Name is not long enough." });

	const token = req.headers["x-access-token"];
	console.log(verify);
  verify(token, "asdasd")
    .then(decoded => User.findOne({ _id: new ObjectId(decoded.id) }))
    .then(user => {
      const chat = new Chat({
        name: req.body.name,
        createdBy: new ObjectId(user._id)
      });
      return chat.save();
    })
    .then(() => res.status(200).send({ added: true, message: "Chat added" })) //response to client
    .catch((err) => {
      res.status(500).send({err: true, message: "Chat already exists"});
    });
});

module.exports = router;
