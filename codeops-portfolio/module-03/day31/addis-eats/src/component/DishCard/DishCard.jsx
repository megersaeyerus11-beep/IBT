import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function DishCard({ dish, onAddToCart }) {
  return (
    <article className="dish-card">
      <img
        src={dish.image}
        alt={dish.name}
      />

      <h3>{dish.name}</h3>

      <p>{dish.description}</p>

      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      {dish.spicy && (
        <span className="spicy">
          🌶️ Spicy
        </span>
      )}

      <div>
        <Link to={`/menu/${dish.id}`}>
          View Details
        </Link>

        <button onClick={() => onAddToCart(dish)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    spicy: PropTypes.bool,
  }).isRequired,

  onAddToCart: PropTypes.func.isRequired,
};

export default DishCard;