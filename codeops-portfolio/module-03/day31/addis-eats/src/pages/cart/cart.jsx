import { Link } from "react-router-dom";

function Cart({ cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>

          <Link to="/menu">
            Go to Menu
          </Link>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>

              <p>
                {item.quantity} × {item.price} ETB
              </p>
            </div>
          ))}

          <h3>
            Total: {total} ETB
          </h3>

          <Link to="/checkout">
            Go to Checkout
          </Link>
        </>
      )}
    </section>
  );
}

export default Cart;