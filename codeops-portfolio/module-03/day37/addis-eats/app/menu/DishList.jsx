import Image from "next/image";
import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article
          className="dish-card"
          key={dish.id}
        >
          <div className="dish-image">
            <Image
              src={dish.image}
              alt={dish.name}
              width={400}
              height={280}
            />
          </div>

          <div className="dish-content">
            <div className="dish-heading">
              <h2>{dish.name}</h2>

              {dish.spicy && (
                <span className="spicy">
                  🌶 Spicy
                </span>
              )}
            </div>

            <p className="category">
              {dish.category}
            </p>

            <p className="description">
              {dish.description}
            </p>

            <div className="dish-bottom">
              <strong>
                {dish.price} ETB
              </strong>

              <Link
                href={`/menu/${dish.id}`}
                className="small-button"
              >
                View
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}