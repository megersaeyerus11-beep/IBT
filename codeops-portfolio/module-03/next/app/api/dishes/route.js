import { db } from "../../src/lib/db";

export async function GET() {
  try {
    const dishes = await db.dish.findMany();

    return Response.json(
      {
        status: "ok",
        data: dishes,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load dishes",
      },
      { status: 500 }
    );
  }
}