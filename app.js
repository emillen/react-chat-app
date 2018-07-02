const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const {
  invalidUrlMiddleware,
  authenticationMiddleware
} = require("./middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/authentication", authRouter);
app.use(authenticationMiddleware);
app.get("/me", (req, res) => {
  res.status(200).send(JSON.stringify({ username: "emilio", likes: "kitten" }));
});

app.use(invalidUrlMiddleware);
module.exports = app;
