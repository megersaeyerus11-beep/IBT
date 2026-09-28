import PropTypes from "prop-types";
import useCartStore from "../../store/cartStore";
import "./DishCard.css";

function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="dish-card">
      <img
        src={dish.image}
        alt={dish.name}
        className="dish-image"
      />

      <div className="dish-info">
        <h3>{dish.name}</h3>

        <p>{dish.category}</p>

        <strong>{dish.price} ETB</strong>

        {dish.spicy && (
          <span className="spicy">🌶️ Spicy</span>
        )}

        <button onClick={() => addItem(dish)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

DishCard.propTypes = {
  dish: PropTypes.object.isRequired,
};

export default DishCard;