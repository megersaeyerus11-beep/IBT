
import Link from "next/link";

export const metadata = {
  title: "Home",
  description:
    "Welcome to Addis Eats. Explore Ethiopian dishes and order your favorites.",
};

export default function HomePage() {
  return (
    <section>
      <nav>
        <Link href="/">Home</Link>{" | "}
        <Link href="/menu">Menu</Link>{" | "}
        <Link href="/cart">Cart</Link>{" | "}
        <Link href="/checkout">Checkout</Link>{" | "}
        <Link href="/signin">Sign in</Link>{" | "}
        <Link href="/register">Register</Link>
      </nav>

      <h2>Welcome to Addis Eats</h2>

      <p>Order your favorite Ethiopian food.</p>

      <h3>Today's Specials</h3>

      <ul>
        <li>Doro Wat</li>
        <li>Kitfo</li>
        <li>Tibs</li>
      </ul>
    </section>
  );
}
