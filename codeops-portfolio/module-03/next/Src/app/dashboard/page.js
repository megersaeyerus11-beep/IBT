import { getOrders } from "@/app/lib/db";
import RevenueChart from "./RevenueChart";

export const dynamic = "force-dynamic";

const money = (amount) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(amount);

function getOrderTotal(order) {
  return Number(order.total ?? order.totalETB ?? order.amount ?? 0);
}

function getNeighbourhood(order) {
  return order.neighbourhood ?? order.neighborhood ?? order.deliveryAddress ?? "Unknown";
}

function getOrderDate(order) {
  const date = new Date(order.createdAt ?? order.placedAt ?? order.date);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  let orders = [];

  try {
    orders = await getOrders();
    if (!Array.isArray(orders)) throw new Error("Orders data is not an array");
  } catch {
    if (params?.demo === "error") {
      return (
        <main className="mx-auto max-w-5xl p-6">
          <h1 className="text-2xl font-bold">Addis Eats Dashboard</h1>
          <p role="alert" className="mt-4 rounded border border-red-300 p-4">
            Unable to load dashboard orders. Please try again later.
          </p>
        </main>
      );
    }

    // Normal failure state: do not silently present fake revenue.
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-bold">Addis Eats Dashboard</h1>
        <p role="alert" className="mt-4 rounded border border-red-300 p-4">
          Dashboard data could not be loaded. Check your order data source.
        </p>
      </main>
    );
  }

  if (params?.demo === "empty") orders = [];

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-bold">Addis Eats Dashboard</h1>
        <p className="mt-4 rounded border p-4">
          No orders yet. Revenue and order trends will appear here after customers place orders.
        </p>
      </main>
    );
  }

  const revenue = new Map();
  const dailyOrders = new Map();

  for (const order of orders) {
    const area = getNeighbourhood(order);
    revenue.set(area, (revenue.get(area) ?? 0) + getOrderTotal(order));

    const date = getOrderDate(order);
    if (date) {
      const day = date.toISOString().slice(0, 10);
      dailyOrders.set(day, (dailyOrders.get(day) ?? 0) + 1);
    }
  }

  const revenueData = [...revenue.entries()]
    .map(([neighbourhood, amount]) => ({ neighbourhood, amount }))
    .sort((a, b) => b.amount - a.amount);

  const dailyData = [...dailyOrders.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({ day, count }));

  const totalRevenue = orders.reduce((sum, order) => sum + getOrderTotal(order), 0);

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold">Addis Eats Dashboard</h1>
        <p className="mt-1 text-gray-600">Order and revenue overview</p>
      </header>

      <section aria-label="Dashboard totals" className="rounded-lg border p-5">
        <h2 className="text-sm text-gray-600">Total revenue</h2>
        <p className="text-3xl font-bold">{money(totalRevenue)}</p>
        <p className="text-sm text-gray-600">{orders.length} orders</p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Revenue by neighbourhood</h2>
        <RevenueChart revenueData={revenueData} dailyData={dailyData} />
      </section>
    </main>
  );
}