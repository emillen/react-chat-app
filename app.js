import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import Promise from "bluebird"
mongoose.connect("mongodb://localhost:27017/chat-app");

mongoose.Promise = Promise;

import { invalidUrlMiddleware, authenticationMiddleware } from "./middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/authentication", authRouter);
app.use(authenticationMiddleware);
app.use("/chat", chatRouter);
app.use(invalidUrlMiddleware);

export default app;
