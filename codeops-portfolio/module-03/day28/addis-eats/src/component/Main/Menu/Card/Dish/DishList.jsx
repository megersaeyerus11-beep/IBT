import Dish from "../Dish/Dish";

function DishList({ dishes, category, onAdd }) {
  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <div>
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

export default DishList;