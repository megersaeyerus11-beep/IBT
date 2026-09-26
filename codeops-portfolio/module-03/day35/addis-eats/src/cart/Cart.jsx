import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useCart } from "./CartContext";

function Cart() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>

        <p>Add something delicious from the menu.</p>

        <Link to="/menu" className="button">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-list">
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.image}
            alt={item.nameEn}
          />

          <div className="cart-item-info">
            <h3>{item.nameEn}</h3>

            <p>
              {item.priceETB} ETB each
            </p>

            <div className="quantity-controls">
              <Button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                −
              </Button>

              <span>{item.quantity}</span>

              <Button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </Button>
            </div>
          </div>

          <div className="cart-item-right">
            <strong>
              {item.priceETB * item.quantity} ETB
            </strong>

            <button
              className="remove-button"
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total: {total} ETB</h2>

        <Link
          to="/checkout"
          className="button primary"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;