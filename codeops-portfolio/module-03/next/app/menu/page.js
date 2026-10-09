import DishList from "../components/DishList";
import { db } from "../src/lib/db";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await db.dish.findMany();

  return (
    <section>
      <h2>Our Menu</h2>


      <DishList dishes={dishes} />
    </section>
  );
}