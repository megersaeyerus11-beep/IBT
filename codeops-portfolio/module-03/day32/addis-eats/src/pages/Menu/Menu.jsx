import { useSearchParams } from "react-router-dom";

import menu from "../../data/menu";
import DishCard from "../../component/DishCard/DishCard";

function Menu({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";

const categories = [
  "All",
  "Main",
  "Vegetarian",
  "Breakfast",
  "Drinks",
];
  const filteredMenu =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  function handleCategory(categoryName) {
    if (categoryName === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: categoryName,
      });
    }
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <div className="category-bar">
        {categories.map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => handleCategory(categoryName)}
          >
            {categoryName}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredMenu.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;