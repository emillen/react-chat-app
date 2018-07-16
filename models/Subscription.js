import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  lasViewed: { type: Schema.Types.Date, default: Date.now }
});

subSchema.index({ user: 1, chat: 1 }, { unique: true });

subSchema.index({ name: "text" });

const Chat = mongoose.model("Subscription", subSchema);
export default Chat;
