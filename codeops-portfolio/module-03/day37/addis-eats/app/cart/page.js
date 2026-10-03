import Link from "next/link";

export default function CartPage() {
  return (
    <main className="container">
      <section className="page-header">
        <p className="eyebrow">
          ADDIS EATS
        </p>

        <h1>Your Cart</h1>

        <p>
          Review your selected dishes before
          checkout.
        </p>
      </section>

      <div className="empty-cart">
        <div className="empty-icon">
          🛒
        </div>

        <h2>Your cart is empty</h2>

        <p>
          Add some delicious Ethiopian food
          to get started.
        </p>

        <Link
          href="/menu"
          className="button"
        >
          Browse Menu
        </Link>
      </div>
    </main>
  );
}