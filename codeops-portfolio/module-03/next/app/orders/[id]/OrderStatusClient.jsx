
"use client";

import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export default function OrderStatusClient({
  orderId,
  initialOrder,
}) {
  const { data, error } = useSWR(
    `/api/orders/${encodeURIComponent(orderId)}`,
    fetcher,
    {
      fallbackData: { data: initialOrder },
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  const order = data?.data ?? data;

  if (!order) {
    if (error) {
      return <p role="alert">Could not load order.</p>;
    }

    return <p>Loading order...</p>;
  }

  return (
    <section className="rounded-lg border p-5">
      <h2 className="text-lg font-bold">Order Status</h2>

      <p>Order ID: {order.id}</p>
      <p>Status: {order.status ?? "Pending"}</p>

      <p className="mt-4 text-sm text-gray-500">
        Automatically refreshes every 5 seconds.
      </p>

      {error && (
        <p role="status">
          Refresh failed. Showing the last available data.
        </p>
      )}
    </section>
  );
}
