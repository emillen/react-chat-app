import React, { Component } from "react";
import PropTypes from "prop-types";
const ChatListItem = ({ title, active, lastViewed, updatedAt, onclick }) => {
  const normalizeLastViewed = lastViewed ? new Date(lastViewed) : new Date(0);
	const normalizeUpdatedAt = updatedAt ? new Date(updatedAt) : new Date(0);
	return (

    <a
      className={
        "list-group-item list-group-item-action font-weight-bold " +
        ((active && " bg-dark text-light") ||
          (normalizeLastViewed < normalizeUpdatedAt && " bg-info text-white ") ||
          "")
      }
      onClick={onclick}
    >
      {title}
    </a>
  );
};

const ChatListMenu = ({ onChange, value }) => (
  <div className="p-2 d-flex bg-light" style={{ flexShrink: 0 }}>
    <div style={{ flexGrow: 2 }}>
      <input
        placeholder={"Filter..."}
        className="form-control border border-primary bg-white"
        onChange={onChange}
        value={value}
      />
    </div>
    <div className="ml-2">
      <a href="/menu" className="btn btn-white text-dark border-dark ">
        +
      </a>
    </div>
  </div>
);

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = { searchString: "", menuModalOpen: false };
  }

  shouldComponentUpdate(nextProps) {
    if (!this.state.activeChat) return true;
    if (this.props.activeChat !== nextProps.activeChat) return true;
    return false;
  }

  render() {
    return (
      <div
        className="border-right border-dark d-flex flex-column"
        style={{ height: "100%", maxHeight: "100%" }}
      >
        <ChatListMenu
          value={this.state.searchString}
          onChange={e => this.setState({ searchString: e.target.value })}
        />
        <div style={{ overflowY: "auto", flexGrow: 1 }} className="list-group">
          {this.props.list
            .filter(chat =>
              chat.name
                .toLowerCase()
                .includes(this.state.searchString.toLowerCase())
            )
            .sort((a, b) => {
              return ("" + a.name).localeCompare(b.name);
            })
            .map(chat => (
              <ChatListItem
                updatedAt={chat.updatedAt}
                lastViewed={chat.lastViewed}
                key={chat._id}
                title={chat.name}
                active={chat._id === this.props.activeChat}
                onclick={() => {
                  this.props.displayChat(chat._id);
                  this.setState({ searchString: "" });
                }}
              />
            ))}
        </div>
      </div>
    );
  }
}

ChatList.propTypes = {
  list: PropTypes.array.isRequired,
  activeChat: PropTypes.string,
  displayChat: PropTypes.func,
  getChatList: PropTypes.func
};

export default ChatList;
