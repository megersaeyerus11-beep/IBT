import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="container">
      <section className="page-header">
        <p className="eyebrow">
          ADDIS EATS
        </p>

        <h1>Checkout</h1>

        <p>
          Enter your delivery information.
        </p>
      </section>

      <div className="checkout-layout">
        <form className="checkout-form">
          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
          />

          <label htmlFor="phone">
            TeleBirr Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxx"
          />

          <label htmlFor="area">
            Delivery Area
          </label>

          <select id="area" name="area">
            <option value="">
              Select delivery area
            </option>

            <option value="Bole">
              Bole
            </option>

            <option value="Kazanchis">
              Kazanchis
            </option>

            <option value="Megenagna">
              Megenagna
            </option>
          </select>

          <label htmlFor="notes">
            Delivery Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows="4"
            placeholder="Optional delivery instructions"
          ></textarea>

          <button
            type="submit"
            className="button"
          >
            Place Order
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <p>
            Your order total will appear here.
          </p>

          <Link href="/cart">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}