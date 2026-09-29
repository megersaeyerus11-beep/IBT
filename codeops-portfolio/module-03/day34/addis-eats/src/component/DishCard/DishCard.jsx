import React, { memo, useRef } from "react";
import { useCartStore } from "../../store/cartStore";
import DishModal from "../DishModal/DishModal";

function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  const [modalOpen, setModalOpen] = React.useState(false);

  const detailsButtonRef = useRef(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Used only to demonstrate ErrorBoundary.
  const forceError = () => {
    throw new Error(`Test error from ${dish.name}`);
  };

  return (
    <>
      <article className="dish-card">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-card-image"
        />

        <div className="dish-card-content">
          <h3>{dish.name}</h3>

          <p>{dish.category}</p>

          <strong>{dish.price} ETB</strong>

          {dish.spicy && (
            <span className="spicy-badge">
              🌶️ Spicy
            </span>
          )}

          <div className="dish-card-actions">
            <button
              ref={detailsButtonRef}
              onClick={handleOpenModal}
            >
              Details
            </button>

            <button
              onClick={() => addItem(dish)}
            >
              Add to Cart
            </button>

            {import.meta.env.DEV && dish.id === 1 && (
              <button
                className="danger-button"
                onClick={forceError}
              >
                Test Error
              </button>
            )}
          </div>
        </div>
      </article>

      {modalOpen && (
        <DishModal
          dish={dish}
          onClose={handleCloseModal}
          returnFocusRef={detailsButtonRef}
        />
      )}
    </>
  );
}

export default memo(DishCard);