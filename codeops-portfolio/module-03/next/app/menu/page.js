import { menu } from "@/app/data/menu";

export default async function MenuPage() {
return (
    <main>
    <h1>Our Menu</h1>

    {menu.map((dish) => (
        <div key={dish.id}>
        <h2>{dish.name}</h2>
        <p>{dish.price} ETB</p>
        </div>
    ))}
    </main>
);
}