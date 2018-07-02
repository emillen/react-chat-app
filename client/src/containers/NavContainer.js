import Nav from "../components/Nav";
import { logoutFromServer } from "../operations/api";
import { connect } from "react-redux";

const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout() {
    logoutFromServer(dispatch);
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Nav);
