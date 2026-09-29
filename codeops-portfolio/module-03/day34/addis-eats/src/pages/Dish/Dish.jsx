import { Link, useParams } from "react-router-dom";

import menu from "../../data/menu";

function Dish() {
  const { id } = useParams();

  const dish = menu.find(
    (item) => item.id === Number(id)
  );

  if (!dish) {
    return (
      <section>
        <h2>Dish Not Found</h2>
        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="dish-detail">
      <img
        src={dish.image}
        alt={dish.name}
      />

      <h2>{dish.name}</h2>

      <p>{dish.description}</p>

      <p>
        Category: {dish.category}
      </p>

      <p>
        Price: <strong>{dish.price} ETB</strong>
      </p>

      {dish.spicy && <p>🌶️ This dish is spicy.</p>}

      <Link to="/menu">
        ← Back to Menu
      </Link>
    </section>
  );
}

export default Dish;