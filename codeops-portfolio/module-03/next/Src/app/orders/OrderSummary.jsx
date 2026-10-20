
"use client";

export default function OrderSummary({ summary }) {
  return (
    <section>
      <h2>Order Summary</h2>

      <p>Total orders: {summary.orderCount}</p>

      <p>
        Total revenue: {summary.revenue.toLocaleString()} ETB
      </p>

      <p>Pending orders: {summary.pendingCount}</p>

      <p>Completed orders: {summary.completedCount}</p>
    </section>
  );
}
