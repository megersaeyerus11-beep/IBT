import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to Addis Eats</h1>

      <p>Order delicious Ethiopian food from Addis Eats.</p>

      <Link href="/menu">
        View Menu
      </Link>
    </section>
  );
}