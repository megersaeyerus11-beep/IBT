import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import { menu } from "./data";

export const revalidate = 60;

const categories = [
"All",
"Main",
"Vegetarian",
"Breakfast",
"Drinks",
];

async function getDishes() {
return menu;
}

export default async function MenuPage() {
const dishes = await getDishes();

return (
    <main>
    <h1>Addis Eats Menu</h1>

    <CategoryBar
        categories={categories}
        selected="All"
    />

    <FilterShell>
        <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList dishes={dishes} />
        </Suspense>
    </FilterShell>
    </main>
);
}
