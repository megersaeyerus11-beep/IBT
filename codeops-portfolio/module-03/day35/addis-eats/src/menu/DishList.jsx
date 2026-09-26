import PropTypes from "prop-types";
import DishCard from "./DishCard";

function DishList({ dishes, onAdd }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default DishList;