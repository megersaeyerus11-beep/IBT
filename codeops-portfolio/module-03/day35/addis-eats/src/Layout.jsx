import {
  NavLink,
  Outlet,
  Link,
} from "react-router-dom";

import CartBadge from "./cart/CartBadge";
import { useAuth } from "./auth/AuthContext";

function Layout() {
  const {
    user,
    logout,
  } = useAuth();

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link
            to="/"
            className="logo"
          >
            Addis<span>Eats</span>
          </Link>

          <nav className="main-nav">
            <NavLink to="/">
              Home
            </NavLink>

            <NavLink to="/menu">
              Menu
            </NavLink>

            <NavLink to="/cart">
              Cart{" "}
              <CartBadge />
            </NavLink>

            {user ? (
              <button
                className="logout-button"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div>
          <strong>
            Addis Eats
          </strong>

          <p>
            Authentic Ethiopian food ·
            Addis Ababa
          </p>
        </div>

        <p>
          © 2026 Addis Eats
        </p>
      </footer>
    </>
  );
}

export default Layout;