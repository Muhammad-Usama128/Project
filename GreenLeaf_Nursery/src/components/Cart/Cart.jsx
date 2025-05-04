import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Cart.css";
const Cart = () => {
  const [Carts, setCarts] = useState(
    !localStorage.getItem("cart")
      ? makeCart()
      : JSON.parse(localStorage.getItem("cart"))
  );
  const [Total, setTotal] = useState(0);
  const [TotalQty, setTotalQty] = useState(0);
  document.title = "Cart - GreenLeaf Nursery";
  useEffect(() => {
    setTotal(
      Carts.reduce(
        (sum, item) => sum + parseFloat(item.price) * parseInt(item.qty),
        0
      ).toFixed(2)
    );
    setTotalQty(Carts.reduce((sum, item) => sum + item.qty, 0));

    localStorage.setItem("cart", JSON.stringify(Carts));
  }, [Carts]);

  function makeCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("cart"));
  }
  const updateQuantity = (id, delta) => {
    setCarts(
      Carts.map((item) =>
        item.name === id ? { ...item, qty: item.qty + delta } : item
      )
    );
  };

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-logo">
          <img src="/Plant_Nursery_logo.png" alt="GreenLeaf Nursery Logo" />
          <p>GreenLeaf Nursery</p>
        </NavLink>
        <div className="navbar-title">Cart</div>
        <div className="navbar-cart">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <span className="cart-badge">{TotalQty}</span>
        </div>
      </nav>
      <div className="cart-container">
        <h2 className="cart-heading">Total Bills: ${Total}</h2>
        <div className="cart-items">
          {Carts.length > 0 ? (
            <div className="cart-items">
              {Carts.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        disabled={item.qty <= 1}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQuantity(item.name, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setCarts(
                        Carts.filter((plant) => plant.name !== item.name)
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
