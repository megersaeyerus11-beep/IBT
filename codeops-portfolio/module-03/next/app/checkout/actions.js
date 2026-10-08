"use server";

import { revalidatePath } from "next/cache";

// -------------------------
// Submit order
// -------------------------
export async function submitOrder(previousState, formData) {
  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();
  const area = formData.get("area");
  const notes = formData.get("notes")?.trim();

  const fieldErrors = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  }

  if (!phone || !/^(?:\+251|0)9\d{8}$/.test(phone)) {
    fieldErrors.phone = "Enter a valid TeleBirr phone number.";
  }

  if (!area) {
    fieldErrors.area = "Please select an area.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 422,
      error: "Validation failed",
      message: "",
      fieldErrors,
    };
  }

  const order = {
    name,
    phone,
    area,
    notes,
    createdAt: new Date().toISOString(),
  };

  console.log("Order created:", order);

  revalidatePath("/orders");
  revalidatePath("/checkout");

  return {
    status: 201,
    error: "",
    message: "Order placed successfully!",
    fieldErrors: {},
  };
}


// -------------------------
// Cancel order
// -------------------------
export async function cancelOrder(orderId) {
  // Session check will go here when authentication is configured.
  
  
  const session = await auth();

  if (!session?.user?.id) {
    return {
      status: 401,
      error: "You must be signed in.",
    };
  }

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    return {
      status: 404,
      error: "Order not found.",
    };
  }

  if (order.userId !== session.user.id) {
    return {
      status: 403,
      error: "You are not allowed to cancel this order.",
    };
  }

  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "cancelled",
    },
  });
  

  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);

  return {
    status: 200,
    message: "Order cancelled successfully.",
  };
}