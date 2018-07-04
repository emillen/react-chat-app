import RegisterForm from "../components/RegisterForm";
import { connect } from "react-redux";
import { register } from "../operations/api";

const mapStoreToProps = store => ({
	error: store.error,
	success: store.register.success
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, username, password) =>
    register(dispatch, email, username, password)
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RegisterForm);
