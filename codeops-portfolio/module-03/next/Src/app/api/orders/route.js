import { orderSchema } from "../../lib/schema";
import { createOrder } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function POST(request) {
  // Layer 2: API must check the session itself.
  const user = await getSession();

  if (!user) {
    return Response.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const result = orderSchema.safeParse({
      name: body.name,
      phone: body.phone,
      dishId: body.dishId,
      quantity: body.quantity !== undefined ? Number(body.quantity) : 1,
      notes: body.notes,
    });

    if (!result.success) {
      return Response.json(
        {
          error: "Validation failed",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    // Do not accept userId from request body.
    const order = await createOrder(result.data, user.id);

    return Response.json(
      { status: "ok", data: order },
      { status: 201 }
    );
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}