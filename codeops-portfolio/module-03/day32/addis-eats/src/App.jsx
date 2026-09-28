import {
  Routes,
  Route,
} from "react-router-dom";

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

        <Route element={<RequireAuth />}>
          <Route
            path="checkout"
            element={<Checkout />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;