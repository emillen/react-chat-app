import mongoose from "mongoose";
import Promise from "bluebird";
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: { type: String, index: { unique: true } },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [
    { text: String, user: { type: Schema.Types.ObjectId, ref: "User" } }
  ],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Chat = mongoose.model("Chat", chatSchema);
export default Promise.promisifyAll(Chat);