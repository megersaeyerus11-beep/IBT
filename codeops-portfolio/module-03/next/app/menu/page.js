
import DishList from "../components/DishList";
import DishSearch from "./DishSearch";
import { db } from "../src/lib/db";

export const revalidate = 3600;

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(
    1,
    Number.parseInt(params?.page ?? "1", 10) || 1
  );

  const pageSize = 10;
  const dishes = await db.dish.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <section>
      <h2>Our Menu</h2>

      <DishSearch initialPage={page} />

      <DishList dishes={dishes} />
    </section>
  );
}
