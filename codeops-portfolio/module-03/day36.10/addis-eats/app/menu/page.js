import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import dishes from "./dishes";

const categories = [
  "All",
  "Main",
  "Vegetarian",
  "Breakfast",
];

export default function MenuPage() {
  return (
    <main className="container">
      <section className="page-header">
        <p className="eyebrow">
          ADDIS EATS
        </p>

        <h1>Our Menu</h1>

        <p>
          Discover delicious Ethiopian dishes
          prepared with traditional flavors.
        </p>
      </section>

      <CategoryBar
        categories={categories}
      />

      <DishList dishes={dishes} />
    </main>
  );
}