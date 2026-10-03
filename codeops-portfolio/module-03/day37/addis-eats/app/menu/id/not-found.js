```jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container">
      <h1>Dish Not Found</h1>

      <p>
        Sorry, we could not find that dish.
      </p>

      <Link href="/menu" className="button">
        ← Back to Menu
      </Link>
    </main>
  );
}
```

