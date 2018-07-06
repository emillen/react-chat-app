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
        <div
          style={{ height: "93vh", maxWidth: "100vw", overflow: "none" }}
          className="row p-0 m-0"
        >
          <div className="col-lg-3 p-0 m-0">
            <ChatList
              list={this.props.chatList}
              activeChat={this.props.chat._id}
              displayChat={this.props.displayChat}
            />
          </div>
          <div className="col-lg-9 p-0 m-0">
            <Chat
              name={this.props.chat.name}
              messages={this.props.chat.messages}
              sendMessage={this.props.sendMessage}
            />
          </div>
        </div>
      );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Home;
