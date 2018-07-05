import ChatList from "../components/ChatList";
import { connect } from "react-redux";
import { getChatList } from "../operations/api";

const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  activeChat: store.chat.name,
  list: store.chatList
});

const mapDispatchToProps = dispatch => ({
  getChatList() {
    return getChatList(dispatch);
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(ChatList);
