import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class TimeoutRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.waitUntilRedirect = this.waitUntilRedirect.bind(this);
  }

	componentDidMount() {
		this.waitUntilRedirect();
	}

  waitUntilRedirect() {
    setTimeout(() => {this.setState({ showTimeout: true })}, 1000);
  }

  render() {
    return <div>{this.state.showTimeout && <Redirect to="/login" />}</div>;
  }
}

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
  }


	
  submitForm(e) {
    e.preventDefault();
    this.props.onSubmit(
      this.state.email,
      this.state.username,
      this.state.password
    );
  }

  render() {
    return (
      <div className="container card mt-5 p-5">
        <h1 className="text-center">Register</h1>
        <form onSubmit={this.submitForm}>
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
                id="inputEmail"
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
              Username:
            </label>
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Username"
                onChange={e => this.setState({ username: e.target.value })}
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
            <div className="col-lg-10">
              <input
                type="password"
                className="form-control"
                id="inputText"
                placeholder="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-larg btn-dark float-right"
            value="Register"
            onClick={this.submitForm}
          />
        </form>
        {this.props.error && (
          <div className="alert alert-warning mt-5" role="alert">
            {this.props.error}
          </div>
        )}
        {this.props.success && (
          <div className="alert alert-success mt-5" role="alert">
            Account added
            <TimeoutRedirect />
          </div>
        )}
      </div>
    );
  }
}

RegisterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	error: PropTypes.string,
	succes: PropTypes.string
};

export default RegisterForm;
