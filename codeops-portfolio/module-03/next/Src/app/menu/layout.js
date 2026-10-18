export default function MenuLayout({ children }) {
  return (
    <section>
      <aside>
        <h3>Menu Categories</h3>

        <ul>
          <li>Traditional Stews & Wat</li>
          <li>Vegetarian</li>
          <li>Main Dishes</li>
          <li>Breakfast</li>
        </ul>
      </aside>

      <div>{children}</div>
    </section>
  );
}