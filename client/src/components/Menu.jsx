import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
const CreateChat = withRouter(({ onSubmit, history }) => {
  return (
    <form
      className="card p-5"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e.target.elements["name"].value)
          .then(() => {
            history.push("/");
          })
          .catch();
      }}
    >
      <h2 className="text-center">Create chat</h2>
      <div className="form-group">
        <input
          name="name"
          type="text"
          className="form-control"
          placeholder="Enter the name of the new chat..."
        />
      </div>
      <button type="submit" className="btn btn-default btn-dark float-rigth">
        Create chat
      </button>
    </form>
  );
});

class JoinChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenChats: [],
      loading: false,
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.search = debounce(this.search, 200).bind(this);
    this.clickChat = this.clickChat.bind(this);
    this.removeChat = this.removeChat.bind(this);
    this.joinChats = this.joinChats.bind(this);
  }

  componentDidMount() {
		this.search("");
	}

  onChange(e) {
		this.setState({success: false})
    this.search(e.target.value);
  }

  search(searchString) {
    this.props.chatSearch(searchString);
  }

  clickChat(chat) {
    this.setState({ chosenChats: [...this.state.chosenChats, chat] });
  }

  removeChat(chatId) {
    this.setState({
      chosenChats: this.state.chosenChats.filter(chat => chat._id !== chatId)
    });
  }

  joinChats() {
    const chosenChats = this.state.chosenChats;
    this.props
      .chatSearch("") //(UGLY SOLUTION) to clear out searchResults
      .then(() => {
        document.querySelector("#join-chat-input").value = "";
        this.setState({ chosenChats: [], loading: true });
        return this.props.joinChats(
          chosenChats.map(chat => chat._id)
        );
      })
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(() => {
        this.setState({ loading: false, success: false });
      });
  }

  render() {
    return (
      <div className="card p-5">
        <h2 className="text-center">Join chats</h2>
        <input
          className="form-control border-primary mt-1"
          placeholder="Search..."
          onChange={this.onChange}
          id="join-chat-input"
        />

        <div className="mt-2">
          {this.state.chosenChats.map(chat => {
            return (
              <span
                key={chat._id}
                className="badge badge-pill badge-dark p-2 pl-3 mb-1 mr-1"
              >
                {chat.name}
                <span
                  className="ml-2 px-1 rounded-circle bg-light text-dark"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() => this.removeChat(chat._id)}
                >
                  &times;
                </span>
              </span>
            );
          })}
        </div>
        <ul className="list-group mt-3">
          {this.props.chatList
            .filter(chat => {
              return (
                this.state.chosenChats
                  .map(cChat => {
                    return cChat._id;
                  })
                  .indexOf(chat._id) === -1
              );
            })
            .map(chat => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => this.clickChat(chat)}
                  key={chat._id}
                  className="list-group-item bg-light"
                >
                  {chat.name}
                </li>
              );
            })}
        </ul>
        {this.state.success && <span className="text-success">success...</span>}
        {this.state.loading && <span className="text-info">loading...</span>}
        <div className="form-group mt-4">
          <button onClick={this.joinChats} className="btn btn-dark float-right">
            Join
          </button>
        </div>
      </div>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state = {
      active: "join-chats"
    };
  }

  onClick(e) {
    this.setState({ active: e.target.id });
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="card container bg-light mt-5 p-5">
          <h2 className="text-center">Menu</h2>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                onClick={this.onClick}
                id="create-chat"
                className={`btn btn-default nav-link ${
                  this.state.active === "create-chat" ? "active" : ""
                }`}
              >
                Create Chat
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onClick}
                id="join-chats"
                className={`btn btn-default nav-link ${
                  this.state.active === "join-chats" ? "active" : ""
                }`}
              >
                Join Chat
              </button>
            </li>
          </ul>

          {this.state.active === "create-chat" && (
            <CreateChat onSubmit={this.props.addChat} />
          )}

          {this.state.active === "join-chats" && (
            <JoinChats
              chatList={this.props.chatList}
              chatSearch={this.props.chatSearch}
              joinChats={this.props.joinChats}
            />
          )}

          {this.props.error && (
            <div className="alert alert-warning mt-5 text-center" role="alert">
              {this.props.error}
            </div>
          )}
        </div>
      );
    }
  }
}

Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  chatSearch: PropTypes.func.isRequired,
  addChat: PropTypes.func.isRequired,
  joinChats: PropTypes.func.isRequired
};

export default Menu;
