import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page not-found">
      <div className="empty-state">
        <p className="eyebrow">
          404
        </p>

        <h1>Page not found</h1>

        <p>
          Sorry, we couldn't find that Addis
          Eats page.
        </p>

        <Link
          to="/"
          className="button primary"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;