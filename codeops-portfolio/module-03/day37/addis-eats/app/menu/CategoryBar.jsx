export default function CategoryBar({
  categories,
}) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className="chip"
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}