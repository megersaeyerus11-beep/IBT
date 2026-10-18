
import { db } from "../lib/db";
import DishSearch from "./DishSearch";

export const revalidate = 3600;

export default async function MenuPage() {
  const initialDishes = await db.dish.findMany();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Addis Eats Menu</h1>
      <DishSearch initialDishes={initialDishes} />
    </main>
  );
}

