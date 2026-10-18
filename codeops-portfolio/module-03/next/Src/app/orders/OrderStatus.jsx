
"use client";

import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not refresh order");
  }

  return response.json();
};

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading, isValidating } = useSWR(
    id ? `/api/orders/${id}` : null,
    fetcher,
    {
      fallbackData: initial,
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  if (isLoading && !data) return <p>Loading order...</p>;

  if (error && !data) {
    return <p role="alert">Could not load order status.</p>;
  }

  if (!data) return <p>Order not found.</p>;

  return (
    <section>
      <h1>Order Status</h1>
      <p>Order ID: {id}</p>
      <p>Status: {data.status}</p>
      {isValidating && <small>Checking for updates...</small>}
      {error && <p>Could not refresh. Showing the last available status.</p>}
    </section>
  );
}
