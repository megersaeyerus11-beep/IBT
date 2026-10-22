import Link from "next/link";
import { notFound } from "next/navigation";
import { menu } from "../data";

export async function generateStaticParams() {
return menu.map((dish) => ({
    id: String(dish.id),
}));
}

export default async function DishPage({ params }) {
const { id } = await params;

const dish = menu.find((item) => String(item.id) === id);

if (!dish) {
    notFound();
}

return (
    <main>
    <h1>{dish.name}</h1>

    <p>Category: {dish.category}</p>
    <p>Price: {dish.price} ETB</p>
    <p>Spicy: {dish.spicy ? "Yes" : "No"}</p>

    <Link href="/menu">Back to Menu</Link>
    </main>
);
}