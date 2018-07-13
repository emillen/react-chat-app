import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import meRouter from "./routes/me";
import Promise from "bluebird";
import { invalidUrlMiddleware, authenticationMiddleware } from "./middleware";

mongoose.connect("mongodb://localhost:27017/chat-app");
mongoose.Promise = Promise;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/authentication", authRouter);
app.use(authenticationMiddleware);
app.use("/chats", chatRouter);
app.use("/me", meRouter);
app.use(invalidUrlMiddleware);
export default app;
