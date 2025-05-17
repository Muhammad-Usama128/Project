import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-div">
        <h1>Welcome to Social Media Dashboard</h1>
        <p>We provide every social media service in one place</p>
        <div className="links">
          <NavLink className="link" to="/facehook">
            FaceHook
          </NavLink>
          <NavLink className="link" to="/instakilo">
            Instakilo
          </NavLink>
          <NavLink className="link" to="/switter">
            Switter
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
