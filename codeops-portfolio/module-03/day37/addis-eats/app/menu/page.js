```jsx
import dishes from "./dishes";
import DishList from "../../components/DishList";

export const revalidate = 60;

export default function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>

      <p>
        Discover delicious Ethiopian dishes.
      </p>

      <DishList dishes={dishes} />
    </div>
  );
}
```
