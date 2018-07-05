import Home from "../components/Home";
import { connect } from "react-redux";
import { getChatList, getChat, sendMessage } from "../operations/api";
const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  chat: store.chat,
  chatList: store.chatList
});

const mapDispatchToProps = dispatch => ({
  getChatList() {
    return getChatList(dispatch);
  },
  displayChat(chatId) {
    return getChat(dispatch, chatId);
	},
	sendMessage
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
