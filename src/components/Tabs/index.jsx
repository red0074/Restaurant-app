import "./index.css";

const Tabs = ({ categories, selectedTab, onTabClick }) => {
  return (
    <div className="tabs">
      {categories.map((cat) => (
        <button
          key={cat.menu_category_id}
          className={`tab-btn ${
            selectedTab === cat.menu_category_id ? "active" : ""
          }`}
          onClick={() => onTabClick(cat.menu_category_id)}
        >
          {cat.menu_category}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
