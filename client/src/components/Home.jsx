import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

import Chat from "./Chat";
import ChatList from "../components/ChatList";
import Socket from "./Socket";

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
        <div style={{ height: "100%", width: "100%" }} className="row p-0 m-0">
          <Socket
            chatId={this.props.chat._id}
            recieveMessage={this.props.recieveMessage}
          />
          {this.props.error && <span>{this.props.error}</span>}
          <div
            id="chatlist"
            style={{ height: "100%", width: "100%" }}
            className={`col-lg-3 p-0 m-0  ${
              this.state.active === "chatlist" ? "" : "d-none"
            } d-lg-block`}
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
            } d-lg-block`}
          >
            <Chat
              chat={this.props.chat}
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
  isAuthenticated: PropTypes.bool.isRequired,
  chat: PropTypes.object.isRequired,
  chatList: PropTypes.array.isRequired,
  getChatList: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  recieveMessage: PropTypes.func.isRequired
};

export default Home;
