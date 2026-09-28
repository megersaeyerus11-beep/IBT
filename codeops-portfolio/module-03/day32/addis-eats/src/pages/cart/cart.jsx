import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import "./Cart.css";

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const addItem = useCartStore((state) => state.addItem);
  const clear = useCartStore((state) => state.clear);
  
  
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        <Link to="/menu">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
            />

            <div>
              <h3>{item.name}</h3>

              <p>
                {item.price} ETB × {item.quantity}
              </p>

              <strong>
                {item.price * item.quantity} ETB
              </strong>
            </div>

            <button onClick={() => remove(item.id)}>
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => {
                const addItem = useCartStore.getState().addItem;
                addItem(item);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: {total} ETB</h2>

        <button onClick={clear}>
          Clear Cart
        </button>

        <Link to="/checkout">
          Checkout
        </Link>
      </div>
    </main>
  );
}

export default Cart;