import React, { Component } from "react";
import PropTypes from "prop-types";


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
		e.preventDefault();
		console.dir(this.state);
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
      </div>
    );
  }
}

RegisterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}


export default RegisterForm;