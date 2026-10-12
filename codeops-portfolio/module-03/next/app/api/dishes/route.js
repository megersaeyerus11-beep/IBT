
import { db } from "../../src/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") ?? "")
      .trim()
      .toLowerCase();

    const page = Math.max(
      1,
      Number.parseInt(searchParams.get("page") ?? "1", 10) || 1
    );

    const pageSize = 10;

    const allDishes = await db.dish.findMany();

    const filtered = search
      ? allDishes.filter((dish) =>
          (dish.nameEn ?? dish.name ?? "")
            .toLowerCase()
            .includes(search)
        )
      : allDishes;

    const start = (page - 1) * pageSize;

    return Response.json({
      status: "ok",
      data: filtered.slice(start, start + pageSize),
      pagination: {
        page,
        pageSize,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
      },
    });
  } catch (error) {
    console.error("GET /api/dishes failed:", error);

    return Response.json(
      { error: "Failed to load dishes" },
      { status: 500 }
    );
  }
}
