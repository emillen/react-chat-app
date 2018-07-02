import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import Nav from "./containers/NavContainer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
