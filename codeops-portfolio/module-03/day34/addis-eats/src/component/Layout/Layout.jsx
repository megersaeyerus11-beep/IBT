import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="header">
        <h1>Addis Eats</h1>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Bole, Addis Ababa · TeleBirr</p>
      </footer>
    </>
  );
}

export default Layout;