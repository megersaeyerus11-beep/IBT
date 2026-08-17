import { withVat, format } from "./pricing.js";

const orders = [
  {
    id: 1,
    customer: "Almaz",
    items: [
      { name: "Teff (kg)", price: 60, qty: 5 },
      { name: "Berbere", price: 120, qty: 1 },
    ],
  },
  {
    id: 2,
    customer: "Sami",
    items: [{ name: "Cooking oil (L)", price: 250, qty: 2 }],
  },
  {
    id: 3,
    customer: "Kidist",
    items: [
      { name: "Onions (kg)", price: 30, qty: 3 },
      { name: "Tomatoes (kg)", price: 40, qty: 2 },
    ],
  },
  {
    id: 4,
    customer: "Mame",
    items: [{ name: "Sugar (kg)", price: 55, qty: 10 }],
  },
];

// reduce: total one order's items by destructuring { price, qty }
const orderItemsTotal = (items) =>
  items.reduce((sum, { price, qty }) => sum + price * qty, 0);

const ordersWithTotals = orders.map((order) => {
  const itemsTotal = orderItemsTotal(order.items);
  return {
    ...order,
    total: withVat(itemsTotal),
  };
});

const bigOrders = ordersWithTotals.filter((order) => order.total > 500);

const grandTotal = ordersWithTotals.reduce(
  (sum, { total }) => sum + total,
  0
);

console.log("=== Addis Market Order Summary ===");
ordersWithTotals.forEach(({ id, customer, total }) => {
  console.log(`Order #${id} — ${customer}: ${format(total)}`);
});

console.log("\n--- Orders over 500 ETB ---");
if (bigOrders.length === 0) {
  console.log("(none)");
} else {
  bigOrders.forEach(({ id, customer, total }) => {
    console.log(`Order #${id} — ${customer}: ${format(total)}`);
  });
}

console.log(`\nGrand Total: ${format(grandTotal)}`);

console.log(
  "\nOriginal order #1 has no 'total' field?",
  orders[0].total === undefined
);