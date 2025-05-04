import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Plant.css";
const Plant = () => {
  const [Plants, setPlants] = useState([]);
  const [TotalQty, setTotalQty] = useState(0);
  const [Carts, setCarts] = useState(
    !localStorage.getItem("cart")
      ? makeCart()
      : JSON.parse(localStorage.getItem("cart"))
  );
  function makeCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("cart"));
  }
  useEffect(() => {
    document.title = "Plants - GreenLeaf Nursery";
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
      })
      .catch((err) => console.error("Failed to load plants:", err));
  }, []);
  const aromaticPlants = Plants.filter((plant) => plant.type === "Aromatic");
  const airPurifyingPlants = Plants.filter(
    (plant) => plant.type === "Air Purifying"
  );
  function addtoCart(e) {
    let newCart = {
      name: e.target.parentElement.getElementsByTagName("h3")[0].textContent,
      image: e.target.parentElement.getElementsByTagName("img")[0].src,
      price: e.target.parentElement
        .getElementsByTagName("p")[1]
        .getElementsByTagName("span")[0].textContent,
      qty: 1,
    };
    setCarts((prevCarts) => [...prevCarts, newCart]);
  }

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(Carts));
    }
    setTotalQty(Carts.reduce((sum, item) => sum + item.qty, 0));
  }, [Carts]);
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-logo">
          <img src="/Plant_Nursery_logo.png" alt="GreenLeaf Nursery Logo" />
          <p>GreenLeaf Nursery</p>
        </NavLink>
        <div className="navbar-title">Cart</div>
        <div className="navbar-cart">
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="cart-badge">{TotalQty}</span>
          </NavLink>
        </div>
      </nav>
      <div className="plant-section">
        <h2 className="section-heading">Air Purifying Plants</h2>
        <div className="plant-card-container">
          {airPurifyingPlants.map((plant, index) => (
            <div key={index} className="plant-card">
              <img src={plant.image} alt="plant" className="plant-image" />
              <h3>{plant.plantName}</h3>
              <p className="plant-desc">{plant.description}</p>
              <p className="plant-price">
                $<span>{plant.price}</span>
              </p>
              {!Carts.find((plants) => plants.name === plant.plantName) ? (
                <button className="Add-to-Cart" onClick={(e) => addtoCart(e)}>
                  Add to Cart
                </button>
              ) : (
                <button className="Added-to-Cart" onClick={(e) => addtoCart(e)}>
                  Added to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="plant-section">
        <h2 className="section-heading">Aromatic Fragrant Plants</h2>
        <div className="plant-card-container">
          {aromaticPlants.map((plant, index) => (
            <div key={index} className="plant-card">
              <img src={plant.image} alt="plant" className="plant-image" />
              <h3>{plant.plantName}</h3>
              <p className="plant-desc">{plant.description}</p>
              <p className="plant-price">
                $<span>{plant.price}</span>
              </p>
              {!Carts.find((plants) => plants.name === plant.plantName) ? (
                <button className="Add-to-Cart" onClick={(e) => addtoCart(e)}>
                  Add to Cart
                </button>
              ) : (
                <button className="Added-to-Cart" onClick={(e) => addtoCart(e)}>
                  Added to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Plant;
