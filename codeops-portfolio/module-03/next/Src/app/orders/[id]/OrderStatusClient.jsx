
"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

export default function OrderStatusClient({
  orderId,
  initialOrder,
}) {
  const { data, error, isValidating } = useSWR(
    `/api/orders/${encodeURIComponent(orderId)}`,
    fetcher,
    {
      fallbackData: { data: initialOrder },
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  const order = data?.data ?? data;

  if (error && !order) {
    return <p role="alert">Could not load order status.</p>;
  }

  if (!order) {
    return <p>Loading order status...</p>;
  }

  return (
    <section className="rounded-lg border p-5">
      <h2 className="text-lg font-bold">Order Status</h2>
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status ?? "PENDING"}</p>

      <p className="mt-4 text-sm text-gray-500">
        {isValidating
          ? "Checking for updates..."
          : "Refreshes automatically every 5 seconds."}
      </p>

      {error && (
        <p role="status">
          Refresh failed. Showing the last available status.
        </p>
      )}
    </section>
  );
}
