import PropTypes from "prop-types";

function CategoryBar({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={
            selectedCategory === category
              ? "category-chip active"
              : "category-chip"
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryBar;