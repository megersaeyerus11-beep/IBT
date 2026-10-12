
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import OrderStatusClient from "./OrderStatusClient";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") || "http";

  const response = await fetch(
    `${protocol}://${host}/api/orders/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not load this order.");
  }

  const result = await response.json();
  const order = result.data ?? result;

  if (!order || !order.id) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Order Status
      </h1>

      <p className="mb-4 text-gray-600">
        Order ID: {order.id}
      </p>

      <OrderStatusClient
        orderId={id}
        initialOrder={order}
      />
    </main>
  );
}
