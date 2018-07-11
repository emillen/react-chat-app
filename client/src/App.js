import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import RegisterForm from "./containers/RegisterPage";
import MenuPage from "./containers/MenuPage";
import Nav from "./containers/NavContainer";
class App extends Component {
  render() {
    return (
      <div
        className="App d-flex flex-column"
        style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}
      >
        <Nav />
        <div style={{ flex: 1, minHeight: 0 }}>
          <Switch>
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/menu" component={MenuPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
