import {
  lazy,
  Suspense,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./Layout";

import Login from "./auth/Login";
import RequireAuth from "./auth/RequireAuth";

import Spinner from "./ui/Spinner";

const Home = lazy(
  () => import("./pages/Home")
);

const Menu = lazy(
  () => import("./menu/Menu")
);

const DishDetail = lazy(
  () => import("./pages/DishDetail")
);

const Cart = lazy(
  () => import("./cart/Cart")
);

const Checkout = lazy(
  () => import("./checkout/Checkout")
);

const NotFound = lazy(
  () => import("./pages/NotFound")
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />

          <Route
            path="menu"
            element={<Menu />}
          />

          <Route
            path="menu/:id"
            element={<DishDetail />}
          />

          <Route
            path="cart"
            element={<Cart />}
          />

          <Route
            path="login"
            element={<Login />}
          />

          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;