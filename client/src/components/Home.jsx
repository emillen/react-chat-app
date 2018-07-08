import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

import Chat from "./Chat";
import ChatList from "../components/ChatList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "chat" };
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    this.props.getChatList();
  }

  handleSwitch(active) {
    this.setState({ active });
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    } else
      return (
        <div
          style={{ height: "100%", width: "100%" }}
          className="row p-0 m-0"
        >
          <div
            id="chatlist"
            style={{ height: "100%", width: "100%" }}
            className={`col-lg-3 p-0 m-0  d-lg-block ${
              this.state.active === "chatlist" ? "" : "d-none"
            }`}
          >
            <ChatList
              list={this.props.chatList}
              activeChat={this.props.chat._id}
              displayChat={chatId => {
                this.props.displayChat(chatId);
                this.setState({ active: "chat" });
              }}
            />
          </div>
          <div
            style={{ height: "100%", width: "100%" }}
            className={`col-lg-9 p-0 m-0 ${
              this.state.active === "chat" ? "" : "d-none"
            }`}
          >
            <Chat
              name={this.props.chat.name}
              messages={this.props.chat.messages}
              sendMessage={this.props.sendMessage}
              onBackbuttonClick={() => {
                this.setState({ active: "chatlist" });
              }}
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
