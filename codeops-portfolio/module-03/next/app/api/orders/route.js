import { orderSchema } from "../../src/lib/schema";
import { createOrder } from "../../src/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = orderSchema.safeParse({
      ...body,
      quantity:
        body.quantity !== undefined
          ? Number(body.quantity)
          : 1,
    });

    if (!result.success) {
      const fieldErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field) {
          fieldErrors[field] = issue.message;
        }
      }

      return Response.json(
        {
          error: "Validation failed",
          fieldErrors,
        },
        { status: 422 }
      );
    }

    const order = await createOrder(result.data);

    return Response.json(
      {
        status: "ok",
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        error: "Invalid request",
      },
      { status: 400 }
    );
  }
}