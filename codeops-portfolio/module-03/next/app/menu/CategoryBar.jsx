import Link from "next/link";

export default function CategoryBar({
categories,
selected,
}) {
return (
    <div className="category-bar">
    {categories.map((category) => (
        <Link
        key={category}
        href={
            category === "All"
        ? "/menu"
            : `/menu?category=${category}`
        }
        className={
            selected === category
            ? "category-active"
            : ""
        }
        >
        {category}
        </Link>
    ))}
    </div>
);
}