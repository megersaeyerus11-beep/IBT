"use server";

import { orderSchema } from "./src/lib/schema";
import { createOrder } from "./src/lib/db";

export async function placeOrder(formData) {
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
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const order = await createOrder(result.data);

    return {
      success: true,
      orderId: order.id,
    };
  } catch {
    return {
      success: false,
      message: "Unable to place your order. Please try again.",
    };
  }
}