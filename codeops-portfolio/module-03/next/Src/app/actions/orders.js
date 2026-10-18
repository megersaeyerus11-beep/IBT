"use server";

import { getSession } from "../lib/session";
import { cancelOrderForUser } from "../lib/db";

export async function cancelOrderAction(formData) {
  // Layer 2: signed-out requests are rejected.
  const user = await getSession();

  if (!user) {
    return { ok: false, message: "Unauthorized. Sign in first." };
  }

  const orderId = String(formData.get("orderId") || "");

  // Layer 3: only the session owner's order can be cancelled.
  const order = await cancelOrderForUser(orderId, user.id);

  if (!order) {
    // Use the same response for missing and other-user orders.
    return { ok: false, message: "Order not found." };
  }

  return { ok: true, message: `Order ${order.id} cancelled.` };
}