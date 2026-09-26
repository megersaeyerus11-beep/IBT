import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./DishCard.css";

function DishCard({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.slug}`} className="dish-image-link">
        <img
          src={dish.image}
          alt={dish.nameEn}
          className="dish-image"
        />
      </Link>

      <div className="dish-content">
        <div className="dish-badges">
          {dish.isSpecial && (
            <span className="badge badge-special">⭐ Special</span>
          )}

          {dish.isFasting && (
            <span className="badge badge-fasting">🌱 Fasting</span>
          )}
        </div>

        <h3>{dish.nameEn}</h3>

        <p className="dish-amharic">
          {dish.nameAm}
        </p>

        <p className="dish-description">
          {dish.description}
        </p>

        <div className="dish-bottom">
          <strong className="dish-price">
            {dish.priceETB} ETB
          </strong>

          {dish.spiceLevel && (
            <span className="spice">
              🌶️ {dish.spiceLevel}
            </span>
          )}
        </div>

        <button
          type="button"
          className="add-button"
          onClick={() => onAdd(dish)}
        >
          + Add to Cart
        </button>
      </div>
    </article>
  );
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    nameEn: PropTypes.string.isRequired,
    nameAm: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    priceETB: PropTypes.number.isRequired,
    spiceLevel: PropTypes.string,
    isFasting: PropTypes.bool,
    isSpecial: PropTypes.bool,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default memo(DishCard);