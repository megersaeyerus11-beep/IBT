import { useState } from "react";
import "./Checkout.css";

function Checkout({ cart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    console.log("Order:", {
      customer: form,
      items: cart,
      total: total,
    });
  }

  return (
    <section className="checkout-page">
      <div className="checkout-card">

        <h2 className="checkout-title">
          Checkout
        </h2>

        <p className="checkout-subtitle">
          Complete your order and enjoy delicious Ethiopian food 🇪🇹
        </p>

        {submitted && (
          <div className="success-message">
            ✅ Your order has been placed successfully!
          </div>
        )}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              TeleBirr Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="09xxxxxxxx"
              required
            />
          </div>

          {/* Delivery Area */}
          <div className="form-group">
            <label htmlFor="area">
              Delivery Area
            </label>

            <select
              id="area"
              name="area"
              value={form.area}
              onChange={handleChange}
            >
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
          </div>

          {/* Notes */}
          <div className="form-group">
            <label htmlFor="notes">
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any special instructions?"
            />
          </div>

          {/* Order Total */}
          <div className="checkout-summary">
            <span>
              Order Total
            </span>

            <strong>
              {total} ETB
            </strong>
          </div>

          {/* Submit */}
          <button
            className="checkout-button"
            type="submit"
          >
            Place Order
          </button>

        </form>
      </div>
    </section>
  );
}

export default Checkout;
