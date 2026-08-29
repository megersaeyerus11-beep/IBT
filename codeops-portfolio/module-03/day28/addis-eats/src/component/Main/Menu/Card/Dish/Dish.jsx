import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB", onAdd }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((currentCount) => currentCount + 1);
    onAdd(price);
  }

  return (
    <div className="dish-card">
      <h3>{name}</h3>

      <p>
        {price} {currency}
      </p>

      {typeof spicy === "boolean" && spicy && (
        <span>Spicy</span>
      )}

      <button onClick={handleAdd}>Add</button>

      <span> {count}</span>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;