import Link from "next/link";

export default function DishList({ dishes }) {
return (
    <div className="dish-list">
    {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
        <img
            src={dish.image}
            alt={dish.name}
        />

        <div className="dish-card-content">
            <h2>{dish.name}</h2>

            <p>Category: {dish.category}</p>

            <p className="dish-price">
            {dish.price} ETB
            </p>

            <Link
            href={`/menu/${dish.id}`}
            className="link-button"
            >
            View Dish
            </Link>
        </div>
        </article>
    ))}
    </div>
);
}