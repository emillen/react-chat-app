import Menu from "../components/Menu";
import { connect } from "react-redux";
import { addChat, chatSearch } from "../operations/api";
const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
	error: store.error,
	chatList: store.chatList
});

const mapDispatchToProps = dispatch => ({
  addChat: name => {
    return addChat(dispatch, name);
	},
	chatSearch: searchString => {
		chatSearch(dispatch, searchString);
	}
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Menu);
