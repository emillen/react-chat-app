import React, { Component } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1"
  },
  messageArea: {
    flexGrow: "1",
    overflow: "auto"
  },
  input: {
    flexGrow: "0",
    alignSelf: "flex-end"
  }
};

const Message = ({ user, date, text }) => {
  return (
    <div
      style={{ minHeight: "min-content" }}
      className="message card my-1 px-3 py-2"
    >
      <h5>{user}:</h5>
      <p style={{whiteSpace: "pre-wrap"}}>{text}</p>
      <hr className="mt-0 pt-0" />
      <small>{date.toString()}</small>
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
			this.props.sendMessage(e.target.value.trim());
      e.target.value = "";
      
    }
  }

  componentDidUpdate() {
    const ma = document.getElementById("message-area");

    ma.scrollTo(0, ma.scrollHeight);
  }

  render() {
    return (
      <div style={styles.container} className="bg-light px-2 pb-2">
        <h2 className="text-center border p-3 bg-white">{this.props.name}</h2>
        <div
          style={styles.messageArea}
          id="message-area"
          className="d-flex flex-column "
        >
          {this.props.messages &&
            this.props.messages.map(msg => (
              <Message
                key={msg._id}
                user={msg.user.username}
                text={msg.text}
                date={msg.createdAt}
              />
            ))}
        </div>
        <div className="mt-2">
          <textarea
            placeholder="Write your message here..."
            className="form-control border-primary"
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
