import React, { Component } from "react";
import io from "socket.io-client";

class Socket extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("serverToken");
    this.state = {
      socket: io({
        query: {
          token
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
      })
    };
    this.joinChannel = this.joinChannel.bind(this);
    this.connect = this.connect.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.chatId === this.props.chatId && this.state.socket.connected)
      return false;
    else return true;
  }

  componentDidMount() {
    this.connect();
    this.state.socket.on("message", message => {
      this.props.recieveMessage(message);
    });
  }

  connect() {
    if (!this.state.socket.connected) {
      this.state.socket.connect("/");
    }
  }

  componentDidUpdate() {
    this.joinChannel(this.state.socket);
  }

  joinChannel(socket) {
    if (this.props.chatId) {
      socket.emit("join chat", this.props.chatId);
    }
  }

  render() {
    return <div />;
  }
}

export default Socket;
