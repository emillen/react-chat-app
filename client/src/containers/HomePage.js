import Home from "../components/Home";
import { fetchMeFromServer } from "../operations/api";
import { connect } from "react-redux";

const mapStoreToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  data: store.me
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => fetchMeFromServer(dispatch)
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
