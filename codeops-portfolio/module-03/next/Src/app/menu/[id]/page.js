import { notFound } from "next/navigation";
import { db, getDish } from "../../lib/db";

export async function generateStaticParams() {
  const dishes = await db.dish.findMany();

  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <section>
      <h2>{dish.name}</h2>

      <p>{dish.description}</p>

      <p>
        Category: {dish.category}
      </p>

      <p>
        Price: {dish.price} {dish.currency}
      </p>

      {dish.available ? (
        <p>Available</p>
      ) : (
        <p>Currently unavailable</p>
      )}
    </section>
  );
}