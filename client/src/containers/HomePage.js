import Home from "../components/Home";
import { connect } from "react-redux";
import { getMyChatList, getChat, sendMessage } from "../operations/api";
import { recieveMessage } from "../actions/chat";
import { updateChat } from "../actions/chatList";
const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  chat: store.chat,
  chatList: store.chatList
});

const mapDispatchToProps = dispatch => ({
  getChatList() {
    return getMyChatList(dispatch);
  },
  displayChat(chatId) {
    return getChat(dispatch, chatId);
  },
  sendMessage(message, chatId) {
    sendMessage(dispatch, message, chatId);
  },
  recieveMessage(message) {
    dispatch(recieveMessage(message));
  },
  updateChat(chat) {
    dispatch(updateChat(chat));
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
