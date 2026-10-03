```jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dishes from "../dishes";

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="container">
      <div className="dish-detail">
        <div className="detail-image">
          <Image
            src={dish.image}
            alt={dish.name}
            width={600}
            height={450}
          />
        </div>

        <div className="detail-content">
          <p className="eyebrow">{dish.category}</p>

          <h1>{dish.name}</h1>

          {dish.spicy && (
            <span className="spicy">
              🌶 Spicy
            </span>
          )}

          <p className="detail-description">
            {dish.description}
          </p>

          <h2 className="detail-price">
            {dish.price} ETB
          </h2>

          <div className="detail-actions">
            <Link href="/menu" className="button secondary">
              ← Back to Menu
            </Link>

            <Link href="/cart" className="button">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
```
