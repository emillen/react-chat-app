import Home from "../components/Home";
import { connect } from "react-redux";
import {
  getMyChatList,
  getChat,
	sendMessage,
} from "../operations/api";
import {recieveMessage} from "../actions/chat"
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
	recieveMessage(message){
		dispatch(recieveMessage(message));
	}
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
