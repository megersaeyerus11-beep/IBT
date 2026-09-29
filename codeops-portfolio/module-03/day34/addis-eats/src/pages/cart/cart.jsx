import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import ErrorHandler from "../../component/ErrorHandler/ErrorHandler";

function CartContent() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore(
    (state) => state.removeItem
  );
  const increaseQty = useCartStore(
    (state) => state.increaseQty
  );
  const decreaseQty = useCartStore(
    (state) => state.decreaseQty
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>

        <p>
          Add some delicious Ethiopian dishes!
        </p>

        <Link to="/menu">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      {items.map((item) => (
        <div
          className="cart-item"
          key={item.id}
        >
          <img
            src={item.image}
            alt={item.name}
          />

          <div>
            <h3>{item.name}</h3>

            <p>
              {item.price} ETB
            </p>

            <div className="quantity-controls">
              <button
                onClick={() =>
                  decreaseQty(item.id)
                }
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQty(item.id)
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() =>
              removeItem(item.id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <strong>
          Total: {total} ETB
        </strong>
      </div>

      <Link
        className="checkout-button"
        to="/checkout"
      >
        Checkout
      </Link>
    </section>
  );
}

function Cart() {
  return (
    <ErrorBoundary>
      <CartContent />
    </ErrorBoundary>
  );
}

export default Cart;