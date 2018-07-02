import React from "react";
import { PropTypes } from "prop-types";
const Nav = ({ isAuthenticated, logout }) => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <a className="navbar-brand">My React Playground</a>
      {isAuthenticated && (
        <button onClick={logout} className="btn btn-dark">
          LogOut
        </button>
      )}
    </nav>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Nav;
