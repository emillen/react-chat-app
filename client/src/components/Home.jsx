import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
class Home extends Component {
  componentDidMount() {
    this.doSomeFetching = this.doSomeFetching.bind(this);
    this.doSomeFetching();
  }

  doSomeFetching() {
    console.log("doing some fetching");
    this.props.fetchData();
    setTimeout(() => {
      this.doSomeFetching();
    }, 10000);
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    } else return <div className="card">{JSON.stringify(this.props.data)}</div>;
  }
}

Home.propTypes = {
  fetchData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Home;
