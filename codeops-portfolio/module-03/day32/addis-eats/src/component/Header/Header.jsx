import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import "./Header.css";

function Header() {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <Link to="/" className="logo">
        Addis Eats
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

export default Header;