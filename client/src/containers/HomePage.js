import Home from "../components/Home";
import { connect } from "react-redux";

const mapStoreToProps = store => ({
	isAuthenticated: store.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
