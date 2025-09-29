import { useEffect, useState } from "react";
import Tabs from "../Tabs";
import DishCard from "../DishCard";
import Navbar from "../Navbar";
import "./index.css";

const API_URL =
  "https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details";

const RestaurantPage = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [dishesByCategory, setDishesByCategory] = useState({});
  const [dishQuantities, setDishQuantities] = useState({});

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setRestaurantData(data[0]);
        setCategories(data[0].table_menu_list || []);

        if (data[0].table_menu_list.length > 0) {
          setSelectedTab(data[0].table_menu_list[0].menu_category_id);
        }

        // Map categoryId -> dishes
        const dishMap = {};
        const quantities = {};

        data[0].table_menu_list.forEach((cat) => {
          dishMap[cat.menu_category_id] = cat.category_dishes;
          // Initialize quantities for all dishes to 0
          cat.category_dishes.forEach((dish) => {
            quantities[dish.dish_id] = 0;
          });
        });

        setDishesByCategory(dishMap);
        setDishQuantities(quantities);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Handle quantity updates
  const handleQuantityChange = (dishId, newQty) => {
    setDishQuantities((prev) => {
      const updated = { ...prev, [dishId]: newQty };

      // Calculate total cart count
      const total = Object.values(updated).reduce((sum, qty) => sum + qty, 0);
      setCartCount(total);

      return updated;
    });
  };

  return (
    <div className="restaurant-page">
      <Navbar
        cartCount={cartCount}
        restaurantName={restaurantData?.restaurant_name}
      />
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
              quantity={dishQuantities[dish.dish_id] || 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
