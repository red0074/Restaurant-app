// Navbar/index.js
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./index.css";

const Navbar = ({ cartCount, restaurantName }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="restaurant-name">
          {restaurantName || "UNI Resto Cafe"}
        </h1>
        <div className="cart-view mobile">
          <div className="cart">
            <ShoppingCartOutlinedIcon />
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
        <div className="cart-view web">
          <p className="orders">My Orders</p>
          <div className="cart">
            <ShoppingCartOutlinedIcon />
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
