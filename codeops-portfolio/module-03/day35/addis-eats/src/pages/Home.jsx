import { Link } from "react-router-dom";

import { fetchMenu } from "../api/menuApi";
import { useFetch } from "../hooks/useFetch";

import DishCard from "../menu/DishCard";
import Spinner from "../ui/Spinner";

function Home() {
  const {
    data: dishes,
    loading,
    error,
  } = useFetch(fetchMenu);

  const specials = dishes.filter(
    (dish) => dish.isSpecial
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Authentic Ethiopian Food
          </p>

          <h1>
            Taste Addis,
            <br />
            one bite at a time.
          </h1>

          <p>
            Traditional Ethiopian dishes,
            delivered fresh to your door.
          </p>

          <Link
            to="/menu"
            className="button primary hero-button"
          >
            Explore Menu
          </Link>
        </div>
      </section>

      <section className="page specials-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              Chef's Picks
            </p>

            <h2>Today's Specials</h2>
          </div>

          <Link to="/menu">
            View all →
          </Link>
        </div>

        {loading && <Spinner />}

        {error && (
          <div className="error-card">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="dish-grid">
            {specials.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;