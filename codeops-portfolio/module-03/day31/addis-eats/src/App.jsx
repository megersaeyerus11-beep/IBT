import { useState } from "react";

import { Routes, Route,} from "react-router-dom";

import Layout from "./component/Layout/Layout";
import RequireAuth from "./component/RequireAuth/RequireAuth";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Dish from "./pages/Dish/Dish";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import SignIn from "./pages/SignIn/SignIn";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const [cart, setCart] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  function addToCart(dish) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...dish,
          quantity: 1,
        },
      ];
    });
  }

  function handleSignIn() {
    setIsSignedIn(true);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        {/* Landing page */}
        <Route
          index
          element={<Home />}
        />

        {/* Menu */}
        <Route
          path="menu"
          element={
            <Menu
              onAddToCart={addToCart}
            />
          }
        />

        {/* Individual dish */}
        <Route
          path="menu/:id"
          element={<Dish />}
        />

        {/* Cart */}
        <Route
          path="cart"
          element={
            <Cart cart={cart} />
          }
        />

        {/* Sign in */}
        <Route
          path="signin"
          element={
            <SignIn
              onSignIn={handleSignIn}
            />
          }
        />

        {/* Protected checkout */}
        <Route element={
          <RequireAuth
            isSignedIn={isSignedIn}
          />
        }>
          <Route
            path="checkout"
            element={
              <Checkout cart={cart} />
            }
          />
        </Route>

        {/* Not found */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;