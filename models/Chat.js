import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: { type: String, index: { unique: true } },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
