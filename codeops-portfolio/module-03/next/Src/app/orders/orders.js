import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import { getOrdersForUser } from "../lib/db";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=%2Forders");
  }

  const orders = await getOrdersForUser(user.id);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="rounded border p-4">
              <a
                href={`/orders/${encodeURIComponent(order.id)}`}
                className="font-medium underline"
              >
                Order #{order.id}
              </a>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}