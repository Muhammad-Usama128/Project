import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [login, setlogin] = useState(JSON.parse(localStorage.getItem("login")));
  function logout() {
    localStorage.removeItem("login");
    window.location.assign("/");
  }
  return (
    <nav>
      <NavLink to="/" className="nav-left">
        <img src="/hootsuite-logo.png" alt="hootsuite" />
      </NavLink>
      <div className="nav-right">
        {login ? (
          <p
            className="link"
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </p>
        ) : (
          <>
            <NavLink className="link" to="/register">
              Register
            </NavLink>
            <NavLink className="link" to="/login">
              Log In
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
