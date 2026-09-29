import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function DishModal({
  dish,
  onClose,
  returnFocusRef,
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

      returnFocusRef?.current?.focus();
    };
  }, [onClose, returnFocusRef]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="dish-modal-backdrop"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close dish details"
        >
          ×
        </button>

        <img
          src={dish.image}
          alt={dish.name}
          className="modal-image"
        />

        <h2 id="dish-modal-title">
          {dish.name}
        </h2>

        <p className="modal-category">
          {dish.category}
        </p>

        <p>
          A delicious Addis Eats dish prepared
          with traditional Ethiopian flavors.
        </p>

        {dish.spicy && (
          <p className="modal-spicy">
            🌶️ This dish is spicy.
          </p>
        )}

        <strong className="modal-price">
          {dish.price} ETB
        </strong>

        <button
          className="modal-done"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  );
}

export default DishModal;