import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

import Chat from "./Chat";
import ChatList from "./ChatList";


class Home extends Component {
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    } else
      return (
        <div style={{ height: "93vh" }} className="d-flex flex-row">
          <ChatList />
          <Chat />
        </div>
      );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Home;
