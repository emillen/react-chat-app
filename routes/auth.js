import express from "express";
import jwt from "jsonwebtoken";
import Promise from "bluebird";
import bcryptModule from "bcrypt";
import User from "../models/User";

const router = express.Router();
const bcrypt = Promise.promisifyAll(bcryptModule);

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return Promise.reject("User does not exist");
      return Promise.all([
        user,
        bcrypt
          .compare(req.body.password, user.passwordHash)
          .then(bResponse => {
						if(bResponse === false)
							return Promise.reject()
						return bResponse
					})
      ]).catch(() => Promise.reject("Password does not match"));
    })
    .then(([user, _]) => {
      // using poop "secret" just for testing
      let token = jwt.sign({ id: user._id }, "asdasd", {
        expiresIn: 20 * 60 * 24 // expires in 24 hours
      });
      return res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(401).send({ auth: false, message: err });
    });
});

router.post("/register", (req, res) => {
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
    .then(() => res.status(200).send({ message: "Account added" }))
    .catch(err => {
      res.status(409).send({ message: "User already exists" });
    });
});

export default router;
