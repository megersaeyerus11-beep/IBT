"use server";

import { orderSchema } from "./lib/schema";
import { createOrder } from "./lib/db";
import { getSession } from "./lib/session";

export async function placeOrder(previousState, formData) {
  // Layer 2: verify the actual session on the server.
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in before placing an order.",
      fieldErrors: {},
    };
  }

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId") || undefined,
    quantity: Number(formData.get("quantity") || 1),
    notes: formData.get("notes") || undefined,
  };

  const result = orderSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // The owner ID comes from the verified session, not form data.
    const order = await createOrder(result.data, user.id);

    return {
      success: true,
      orderId: order.id,
      message: "",
      fieldErrors: {},
    };
  } catch {
    return {
      success: false,
      message: "Unable to place your order. Please try again.",
      fieldErrors: {},
    };
  }
}