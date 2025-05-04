import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
const Home = () => {
  document.title =
    "GreenLeaf Nursery - Everything you need to know about Plants";
  return (
    <>
      <div className="container">
        <div className="left-section">
          <img
            src="/Plant_Nursery_logo.png"
            alt="Plant Nursery"
            className="logo"
          />
          <h2 className="company-name">GreenLeaf Nursery</h2>
          <NavLink to="/plant" className="explore-button">
            Explore Plants
          </NavLink>
        </div>

        <div className="right-section">
          <p className="description">
            Welcome to our GreenLeaf Nursery, where we blend nature with care.
            We focus on cultivating and providing a diverse selection of robust,
            premium plants, including flowers, shrubs, trees, and indoor plants
            to enhance your home, garden, or landscape. Whether you are a home
            gardener, a landscaping expert, or a plant enthusiast, our nursery
            is dedicated to assisting you in expanding your green space with
            professional guidance and tailored service. Discover our flourishing
            assortment and allow us to help you realize your gardening
            aspirations.At GreenLeaf Nursery, we are passionate about nurturing
            nature. We offer a wide variety of indoor and outdoor plants,
            gardening tools, and expert advice to help you create your perfect
            green space. Whether you're a seasoned gardener or just getting
            started, we have something for everyone.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
