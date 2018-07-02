const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fakeUser = { email: "emil.lengman@stuff.se", password: "hehehe", _id: 1 };

router.post("/", function(req, res, next) {
  if (req.body.email !== fakeUser.email)
    res.status(401).send({ auth: false, message: "No user found" });
  if (req.body.password !== fakeUser.password)
    return res
      .status(401)
      .send({ auth: false, token: null, message: "Password does not match" });
  var token = jwt.sign({ id: fakeUser._id }, "asdasd", {
    expiresIn: 20 * 60 * 24 // expires in 24 hours
  });

  res.status(200).send({ auth: true, token: token });
});

module.exports = router;
