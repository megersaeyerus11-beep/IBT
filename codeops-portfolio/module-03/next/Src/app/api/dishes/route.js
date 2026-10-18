
import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "")
    .trim()
    .toLowerCase();

  const dishes = await db.dish.findMany();

  const filtered = search
    ? dishes.filter((dish) =>
        `${dish.name} ${dish.description} ${dish.category}`
          .toLowerCase()
          .includes(search)
      )
    : dishes;

  return NextResponse.json({ data: filtered });
}
