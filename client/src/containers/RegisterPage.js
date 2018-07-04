import RegisterForm from "../components/RegisterForm";
import { connect } from "react-redux";

const mapStoreToProps = store => ({});

const mapDispatchToProps = dispatch => ({
	onSubmit: (email, username, password) => console.log(email, username, password),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RegisterForm);
