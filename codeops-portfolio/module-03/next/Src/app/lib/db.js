/**
 * In-memory mock database for Addis Eats coursework.
 * This is demo storage only; data resets when the server restarts.
 */

// Dish records
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description:
      "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description:
      "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

// Keep these exports because menu pages and the dishes API import them.
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((dish) => dish.id === where.id) || null,
  },
};

export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) || null;
}

// In-memory orders (demo only)
const mockOrders = [];

// Create an order. userId must come from the server-verified session.
export async function createOrder(data, userId) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const newOrder = {
    id: `ord_${crypto.randomUUID()}`,
    ...data,
    userId,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}

// List only the signed-in customer's orders.
export async function getOrdersForUser(userId) {
  if (!userId) return [];
  return mockOrders.filter((order) => order.userId === userId);
}

// Find an order only when its owner matches.
export async function getOrderForUser(orderId, userId) {
  if (!userId) return null;

  return (
    mockOrders.find(
      (order) => order.id === orderId && order.userId === userId
    ) || null
  );
}

// Cancel only an order owned by this user.
export async function cancelOrderForUser(orderId, userId) {
  const order = await getOrderForUser(orderId, userId);

  if (!order) return null;

  if (order.status !== "CANCELLED") {
    order.status = "CANCELLED";
    order.updatedAt = new Date().toISOString();
  }

  return order;
}