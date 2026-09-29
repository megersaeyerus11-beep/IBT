import React, {
  lazy,
  Suspense,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./component/Layout/Layout";
import RequireAuth from "./component/RequireAuth/RequireAuth";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Dish from "./pages/Dish/Dish";
import SignIn from "./pages/SignIn/SignIn";
import NotFound from "./pages/NotFound/NotFound";

const Checkout = lazy(
  () => import("./pages/Checkout/Checkout")
);

const Receipt = lazy(
  () => import("./pages/Receipt/Receipt")
);

function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-box" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
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
          element={<Dish />}
        />

        <Route
          path="cart"
          element={<Cart />}
        />

        <Route
          path="signin"
          element={<SignIn />}
        />

        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Suspense
                fallback={<LoadingSkeleton />}
              >
                <Checkout />
              </Suspense>
            </RequireAuth>
          }
        />

        <Route
          path="receipt"
          element={
            <Suspense
              fallback={<LoadingSkeleton />}
            >
              <Receipt />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;