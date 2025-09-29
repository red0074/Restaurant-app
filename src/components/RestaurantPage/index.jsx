import React, { useEffect, useState } from "react";
import Tabs from "../Tabs";
import DishCard from "../DishCard";
import Navbar from "../Navbar";
import "./index.css";

const API_URL =
  "https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details";

const RestaurantPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [dishesByCategory, setDishesByCategory] = useState({});

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCategories(data[0].table_menu_list || []);
        if (data[0].table_menu_list.length > 0) {
          setSelectedTab(data[0].table_menu_list[0].menu_category_id);
        }

        // Map categoryId -> dishes
        const dishMap = {};
        data[0].table_menu_list.forEach((cat) => {
          dishMap[cat.menu_category_id] = cat.category_dishes;
        });
        setDishesByCategory(dishMap);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  // Handle quantity updates
  const handleQuantityChange = (dish, newQty) => {
    let total = 0;
    Object.values(dishesByCategory).forEach((dishes) => {
      dishes.forEach((d) => {
        if (d.dish_id === dish.dish_id) {
          d.__qty = newQty; // store qty in dish object
        }
        total += d.__qty || 0;
      });
    });
    setCartCount(total);
  };

  return (
    <div className="restaurant-page">
      <Navbar cartCount={cartCount} />
      <Tabs
        categories={categories}
        selectedTab={selectedTab}
        onTabClick={setSelectedTab}
      />

      <div className="dish-list">
        {selectedTab &&
          dishesByCategory[selectedTab]?.map((dish) => (
            <DishCard
              key={dish.dish_id}
              dish={dish}
              onQuantityChange={handleQuantityChange}
            />
          ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
