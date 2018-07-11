import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
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

class Menu extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state = {
      active: "create-chat"
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
        <div className="card container mt-5 p-5">
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
                id="join-chat"
                className={`btn btn-default nav-link ${
                  this.state.active === "join-chat" ? "active" : ""
                }`}
              >
                Join Chat
              </button>
            </li>
          </ul>

          {this.state.active === "create-chat" && (
            <CreateChat onSubmit={this.props.addChat} />
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
	error: PropTypes.string
}

export default Menu;
