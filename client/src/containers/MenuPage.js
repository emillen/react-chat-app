import Menu from "../components/Menu";
import { connect } from "react-redux";
const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  addChat: name => {
    console.log(name);
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Menu);
