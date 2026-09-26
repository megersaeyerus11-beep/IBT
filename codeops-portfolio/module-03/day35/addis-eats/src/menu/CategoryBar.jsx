function CategoryBar({
  categories,
  selected,
  onSelect,
}) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            selected === category
              ? "category-button active"
              : "category-button"
          }
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;