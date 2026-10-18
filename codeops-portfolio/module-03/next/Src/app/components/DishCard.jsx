import Link from "next/link";

export default function DishCard({ dish }) {
  return (
    <article>
      <h3>{dish.name}</h3>

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

      <Link href={`/menu/${dish.id}`}>
        View Dish
      </Link>
    </article>
  );
}