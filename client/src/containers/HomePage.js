import Home from "../components/Home";
import { connect } from "react-redux";
import { getChatList } from "../operations/api";
import { getChat } from "../operations/api";
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
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
