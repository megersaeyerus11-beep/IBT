
import Image from "next/image";
import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <Image
            src={dish.image}
            alt={dish.name}
            width={300}
            height={220}
          />

          <div className="dish-card-content">
            <p>{dish.category}</p>

            <h2>{dish.name}</h2>

            <p>{dish.price} ETB</p>

            {dish.spicy && (
              <span>🌶 Spicy</span>
            )}

            <Link href={`/menu/${dish.id}`}>
              View Dish
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

