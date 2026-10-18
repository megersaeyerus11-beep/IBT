"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

const initialState = {
  success: false,
  fieldErrors: {},
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  if (state.success) {
    return (
      <section>
        <h2>Order placed!</h2>
        <p>Your order number is {state.orderId}.</p>
      </section>
    );
  }

  return (
    <form action={formAction}>
      <label htmlFor="name">Full name</label>
      <input id="name" name="name" required />

      {state.fieldErrors?.name?.map((error) => (
        <p key={error} role="alert">{error}</p>
      ))}

      <label htmlFor="phone">TeleBirr phone</label>
      <input
        id="phone"
        name="phone"
        placeholder="0912345678"
        required
      />

      {state.fieldErrors?.phone?.map((error) => (
        <p key={error} role="alert">{error}</p>
      ))}

      <label htmlFor="dishId">Dish ID (optional)</label>
      <input id="dishId" name="dishId" placeholder="dish_1" />

      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        min="1"
        defaultValue="1"
        required
      />

      {state.fieldErrors?.quantity?.map((error) => (
        <p key={error} role="alert">{error}</p>
      ))}

      <label htmlFor="notes">Order notes (optional)</label>
      <textarea id="notes" name="notes" />

      {state.message && <p role="alert">{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}