import { useState } from "react";
import CategoryBar from "../CategoryBar/CategoryBar";
import DishList from "../DishList/DishList";
import dishes from "../../data/menu";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const categories = [
    "All",
    "Main",
    "Vegetarian",
    "Breakfast",
  ];

function handleAdd(price) {
    setTotal((currentTotal) => currentTotal + price);
  }

  return (
    <main>
      <h1>Welcome to Addis Eats</h1>

      <CategoryBar
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <DishList
        dishes={dishes}
        category={category}
        onAdd={handleAdd}
      />


      <div className="order-total">
        <h2>Order Total</h2>
        <p>{total} ETB</p>
      </div>
    </main>
  );
}

export default Menu;