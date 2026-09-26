import { useCart } from "./CartContext";

function CartBadge() {
  const { itemCount } = useCart();

  return (
    <span className="cart-badge">
      {itemCount}
    </span>
  );
}

export default CartBadge;