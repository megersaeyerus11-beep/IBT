import Link from "next/link";

export default function MenuNotFound() {
  return (
    <main className="container not-found">
      <div className="not-found-box">
        <div className="not-found-icon">
          🍽️
        </div>

        <h1>Dish Not Found</h1>

        <p>
          Sorry, we couldn't find the dish
          you're looking for.
        </p>

        <Link
          href="/menu"
          className="button"
        >
          ← Back to Menu
        </Link>
      </div>
    </main>
  );
}