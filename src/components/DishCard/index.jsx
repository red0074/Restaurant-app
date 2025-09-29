// DishCard/index.js
import React from "react";
import "./index.css";

const DishCard = ({ dish, quantity, onQuantityChange }) => {
  const increase = () => {
    onQuantityChange(dish.dish_id, quantity + 1);
  };

  const decrease = () => {
    if (quantity > 0) {
      onQuantityChange(dish.dish_id, quantity - 1);
    }
  };

  return (
    <div className="dish-card">
      <div className="dish-info">
        <div
          className={`veg-indicator ${
            dish.dish_Type === 2 ? "non-veg" : "veg"
          }`}
        ></div>
        <div className="dish-details">
          <h3 className="dish-name">{dish.dish_name}</h3>
          <p className="dish-price">
            {dish.dish_currency} {dish.dish_price}
          </p>
          <p className="dish-desc">{dish.dish_description}</p>
          <p className="dish-calories">{dish.dish_calories} calories</p>

          {dish.addonCat && dish.addonCat.length > 0 && (
            <p className="customization">Customizations available</p>
          )}

          {!dish.dish_Availability && (
            <p className="not-available">Not available</p>
          )}

          {dish.dish_Availability && (
            <div className="quantity-control">
              <button onClick={decrease}>-</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
            </div>
          )}
        </div>
      </div>

      {/* Dish image */}
      <div className="dish-img-container">
        <img src={dish.dish_image} alt={dish.dish_name} className="dish-img" />
      </div>
    </div>
  );
};

export default DishCard;
