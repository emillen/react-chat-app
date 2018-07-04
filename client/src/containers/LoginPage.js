import { authenticateToServer } from "../operations/api";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";

const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  error: store.error
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => {
    authenticateToServer(dispatch, email, password);
  }
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(LoginForm);
