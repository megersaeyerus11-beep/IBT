import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Field from "./Field";
import { validate } from "./validate";

import Button from "../ui/Button";
import { useCart } from "../cart/CartContext";

function Checkout() {
  const {
    cart,
    total,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const firstErrorRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const errors = useMemo(
    () => validate(form),
    [form]
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitError("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const allErrors = validate(form);

    setTouched({
      name: true,
      phone: true,
      area: true,
    });

    if (Object.keys(allErrors).length > 0) {
      firstErrorRef.current?.focus();
      return;
    }

    if (cart.length === 0) {
      setSubmitError(
        "Your cart is empty."
      );
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setSuccess(true);
      clearCart();
    } catch (error) {
      setSubmitError(
        error.message ||
          "Order could not be placed."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="page success-page">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <h1>Order received!</h1>

          <p>
            Thank you, {form.name}. Your Addis
            Eats order has been received.
          </p>

          <p>
            We will contact you on{" "}
            <strong>{form.phone}</strong>.
          </p>

          <Button
            onClick={() => navigate("/menu")}
          >
            Order More Food
          </Button>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="page">
        <div className="empty-state">
          <h1>Your cart is empty</h1>

          <p>
            Add food before going to checkout.
          </p>

          <Link
            to="/menu"
            className="button"
          >
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <section className="checkout-card">
        <div>
          <p className="eyebrow">
            Final Step
          </p>

          <h1>Checkout</h1>

          <p>
            Tell us where to deliver your food.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <Field
            label="Full name"
            id="checkout-name"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            onBlur={handleBlur}
            error={
              touched.name
                ? errors.name
                : ""
            }
            placeholder="Your full name"
          />

          <Field
            label="TeleBirr phone"
            id="checkout-phone"
            type="tel"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                phone: event.target.value,
              }))
            }
            onBlur={handleBlur}
            error={
              touched.phone
                ? errors.phone
                : ""
            }
            placeholder="0912345678"
          />

          <Field
            label="Delivery area"
            id="checkout-area"
            type="select"
            value={form.area}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                area: event.target.value,
              }))
            }
            onBlur={handleBlur}
            error={
              touched.area
                ? errors.area
                : ""
            }
          >
            <option value="">
              Select area
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
          </Field>

          <Field
            label="Notes (optional)"
            id="checkout-notes"
            type="textarea"
            value={form.notes}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                notes: event.target.value,
              }))
            }
            onBlur={handleBlur}
            placeholder="Apartment, gate, special instructions..."
          />

          {submitError && (
            <div
              className="submit-error"
              role="alert"
            >
              {submitError}
            </div>
          )}

          <div className="checkout-total">
            <span>Total</span>

            <strong>
              {total} ETB
            </strong>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="button primary checkout-submit"
          >
            {submitting
              ? "Placing order..."
              : `Place order · ${total} ETB`}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Checkout;