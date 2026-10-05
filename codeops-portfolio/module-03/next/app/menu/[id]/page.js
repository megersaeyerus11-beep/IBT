import Link from "next/link";
import { notFound } from "next/navigation";

const menu = [
{
    id: 1,
    name: "Doro Wat",
    category: "Main",
    price: 240,
},
{
    id: 2,
    name: "Shiro",
    category: "Vegetarian",
    price: 120,
},
{
    id: 3,
    name: "Kitfo",
    category: "Main",
    price: 320,
},
{
    id: 4,
    name: "Tibs",
    category: "Main",
    price: 280,
},
];

export async function generateStaticParams() {
return menu.map((dish) => ({
    id: String(dish.id),
}));
}

export default async function DishPage({ params }) {
const { id } = await params;

const dish = menu.find(
    (item) => String(item.id) === id
);

if (!dish) {
    notFound();
}

return (
    <main className="dish-details">
    <h1>{dish.name}</h1>

    <p>Category: {dish.category}</p>

    <p>Price: {dish.price} ETB</p>

    <Link href="/menu" className="link-button">
        Back to Menu
    </Link>
    </main>
);
}