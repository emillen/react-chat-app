import Menu from "../components/Menu";
import { connect } from "react-redux";
import { addChat } from "../operations/api";
const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  error: store.error
});

const mapDispatchToProps = dispatch => ({
  addChat: name => {
    return addChat(dispatch, name);
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Menu);
