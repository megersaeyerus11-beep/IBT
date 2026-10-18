import { notFound, redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { getOrderForUser } from "../../lib/db";
import OrderStatusClient from "./OrderStatusClient";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=%2Forders");
  }

  const { id } = await params;
  const order = await getOrderForUser(id, user.id);

  // Treat another user's order the same as a nonexistent order.
  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Order Status</h1>

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