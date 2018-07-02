import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;
    else
      return (
        <div className="card p-5 m-5">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={this.submit}>
            <div className="form-group row ">
              <label
                htmlFor="inputPassword"
                className="col-lg-2 col-form-label text-lg-right text-sm-left"
              >
                Email:
              </label>
              <div className="col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputText"
                  placeholder="Email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group row ">
              <label
                htmlFor="inputPassword"
                className="col-lg-2 col-form-label text-lg-right text-sm-left"
              >
                Password:
              </label>
              <div className="col-lg-10 ">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
            <button
              onClick={this.submit}
              type="button"
              className="btn btn-dark float-right"
            >
              Login
            </button>
          </form>

          {this.props.error && (
            <div className="alert alert-warning mt-5" role="alert">
              {this.props.error}
            </div>
          )}
        </div>
      );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default LoginForm;
