const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const User = Promise.promisifyAll(require("../models/User"));

router.post("/", function(req, res) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return Promise.reject("User does not exist");

      return Promise.all([
        user,
        bcrypt.compare(req.body.password, user.passwordHash).catch(() => Promise.reject("Password does not match"))
      ]);
    })
    .then(promises => {
      let user = promises[0];
      let token = jwt.sign({ id: user._id }, "asdasd", {
        // using poop code
        expiresIn: 20 * 60 * 24 // expires in 24 hours
      });
      return res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(401).send({ auth: false, message: err });
    });
});

router.post("/register", function(req, res) {
  const passwordRegexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}/;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!req.body.password.match(passwordRegexp))
    return res.status(400).send({ message: "Invalid password" });
  if (!req.body.email.match(emailRegexp))
    return res.status(400).send({ message: "Invalid email" });
  if (req.body.username.length < 4)
    return res
      .status(400)
      .send({ message: "Username must be atleast 4 characters" });

  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        passwordHash: hash
      });

      return newUser.save();
    })
    .then(newUser => {
      res.status(200).send({ message: "Account added" });
    })
    .catch(err => {
      res.status(409).send({ message: "User already exists" });
    });
});

module.exports = router;
