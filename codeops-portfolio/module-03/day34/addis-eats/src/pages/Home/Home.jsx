import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <h2>Welcome to Addis Eats 🇪🇹</h2>

      <p>
        Order delicious Ethiopian food from your favorite local dishes.
      </p>

      <Link to="/menu">
        <button>View Menu</button>
      </Link>
    </section>
  );
}

export default Home;