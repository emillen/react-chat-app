import React, { Component } from "react";

const styles = {
  container: {
    height: "100%",
    maxHeight: "100%"
  },
  messageArea: {
    flexGrow: "2",
    overflow: "scroll"
  },
  input: {
    flexGrow: "1"
  }
};

const Message = ({ user, date, text }) => {
  return (
    <div style={{}} className="message card my-1 px-3 pb-2 pt-3">
      <h5>{user}:</h5>
      <hr className="mt-0 pt-0" />
      <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
      <hr className="mt-0 pt-0" />
      <small>{date.toString()}</small>
    </div>
  );
};

const ChatHeader = ({ name, onBackbuttonClick }) => {
  return (
    <div
      style={{ flexShrink: 0 }}
      className="text-center border-bottom border-dark p-3 bg-white d-flex "
    >
      <div style={{ flex: 1 }}>
        <button
          onClick={onBackbuttonClick}
          className="btn btn-dark float-left d-lg-none d-inline"
        >
          &lt;
        </button>
      </div>
      <div className="">
        <h2> {name}</h2>
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.keyEventHandler = this.keyEventHandler.bind(this);
  }

  keyEventHandler(e) {
    this.setState({ [e.keyCode]: e.type === "keydown" });

    if (e.type === "keyup" && e.keyCode === 13 && !this.state[16]) {
      e.preventDefault();
      this.props.sendMessage(e.target.value.trim(), this.props.chat._id);
      e.target.value = "";
    }
  }

  componentDidUpdate() {
    const ma = document.getElementById("message-area");
    if (ma) {
      ma.scrollTo(0, ma.scrollHeight);
    }
  }

  render() {
    if (!this.props.chat.name)
      return (
        <ChatHeader
          name="choose a chat in the menu"
          onBackbuttonClick={this.props.onBackbuttonClick}
        />
      );
    else
      return (
        <div style={styles.container} className="bg-light d-flex flex-column">
          <ChatHeader
            name={this.props.chat.name}
            onBackbuttonClick={this.props.onBackbuttonClick}
          />
          <div
            style={styles.messageArea}
            id="message-area"
            className="px-2 pb-2"
          >
            {this.props.chat.messages &&
              this.props.chat.messages
                .sort((a, b) => {
                  if (b.createdAt > a.createdAt) return -1;
                  if (a.createdAt > b.createdAt) return 1;
                  return 0;
                })
                .map(msg => (
                  <Message
                    key={msg._id}
                    user={msg.user.username}
                    text={msg.text}
                    date={msg.createdAt}
                  />
                ))}
          </div>
          <div
            className="mt-2 align-self-end px-2 pb-2"
            style={{ width: "100%" }}
          >
            <textarea
              placeholder="Write your message here..."
              className="form-control border-primary "
              rows="3"
              style={{ resize: "none" }}
              onKeyDown={this.keyEventHandler}
              onKeyUp={this.keyEventHandler}
            />
          </div>
        </div>
      );
  }
}

export default Chat;
