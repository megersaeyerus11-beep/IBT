```jsx
import { Suspense } from "react";
import dishes from "./dishes";
import DishList from "../../components/DishList";

export const revalidate = 60;

function DishListFallback() {
  return (
    <div className="loading-dishes">
      <p>Loading dishes...</p>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>

      <p>
        Discover delicious Ethiopian dishes.
      </p>

      <Suspense fallback={<DishListFallback />}>
        <DishList dishes={dishes} />
      </Suspense>
    </div>
  );
}
```
