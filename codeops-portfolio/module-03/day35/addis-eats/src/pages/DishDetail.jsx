import { Link, useParams } from "react-router-dom";

import { fetchMenu } from "../api/menuApi";
import { useFetch } from "../hooks/useFetch";

import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useCart } from "../cart/CartContext";

function DishDetail() {
  const { id } = useParams();

  const {
    data: dishes,
    loading,
    error,
  } = useFetch(fetchMenu);

  const { addToCart } = useCart();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <main className="page">
        <div className="error-card">
          <h1>Could not load dish</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  const dish = dishes.find(
    (item) => item.slug === id
  );

  if (!dish) {
    return (
      <main className="page">
        <div className="empty-state">
          <h1>Dish not found</h1>

          <Link
            to="/menu"
            className="button"
          >
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <Link
        to="/menu"
        className="back-link"
      >
        ← Back to Menu
      </Link>

      <section className="detail-card">
        <img
          src={dish.image}
          alt={dish.nameEn}
          className="detail-image"
        />

        <div className="detail-content">
          <p className="eyebrow">
            {dish.category}
          </p>

          <h1>{dish.nameEn}</h1>

          <p className="amharic large">
            {dish.nameAm}
          </p>

          <p className="detail-description">
            {dish.description}
          </p>

          <div className="detail-price">
            {dish.priceETB} ETB
          </div>

          <div className="detail-info">
            <p>
              <strong>Spice:</strong>{" "}
              {dish.spiceLevel}
            </p>

            <p>
              <strong>Serving:</strong>{" "}
              {dish.servings}
            </p>

            {dish.alcohol && (
              <p>
                <strong>Alcohol:</strong>{" "}
                {dish.alcohol}
              </p>
            )}

            <p>
              <strong>Fasting:</strong>{" "}
              {dish.isFasting
                ? "Yes"
                : "No"}
            </p>
          </div>

          <h3>Ingredients</h3>

          <ul className="ingredients">
            {dish.ingredients.map(
              (ingredient) => (
                <li key={ingredient}>
                  {ingredient}
                </li>
              )
            )}
          </ul>

          <Button
            className="primary"
            onClick={() =>
              addToCart(dish)
            }
          >
            Add to Cart · {dish.priceETB} ETB
          </Button>
        </div>
      </section>
    </main>
  );
}

export default DishDetail;