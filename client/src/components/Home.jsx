import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

import Chat from "./Chat";
import ChatList from "../components/ChatList";

class Home extends Component {

  componentDidMount() {
    this.props.getChatList();
  }
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    } else
      return (
        <div style={{ height: "93vh" }} className="d-flex flex-row">
          <ChatList list={this.props.chatList} activeChat={"asdasdasdasd"} />
          <Chat />
        </div>
      );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Home;
