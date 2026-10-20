
"use client";

export default function OrdersError({ error, reset }) {
  return (
    <main role="alert">
      <h1>Could not load your orders</h1>

      <p>
        Something went wrong while retrieving your order history.
        Please try again.
      </p>

      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
