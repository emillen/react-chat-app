import React from "react";
import { PropTypes } from "prop-types";

const Nav = ({ isAuthenticated, logout }) => {
  return (
    <nav style={{height: "7vh"}} className="navbar navbar-dark bg-dark text-light justify-content-between">
      <a className="navbar-brand" href="/">Chat Against Humanity</a>
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
