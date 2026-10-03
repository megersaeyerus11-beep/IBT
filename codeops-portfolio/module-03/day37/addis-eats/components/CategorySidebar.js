
import Link from "next/link";

const categories = [
  "All",
  "Main",
  "Vegetarian",
  "Breakfast",
  "Drinks",
];

export default function CategorySidebar() {
  return (
    <div className="category-sidebar">
      <h2>Categories</h2>

      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={
                category === "All"
                  ? "/menu"
                  : `/menu?category=${category}`
              }
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

