import Link from "next/link";

export default function MenuLayout({ children }) {
return (
    <div className="menu-layout">
    <aside className="menu-sidebar">
        <h2>Categories</h2>

        <nav aria-label="Menu categories">
        <ul>
            <li>
            <Link href="/menu">All Dishes</Link>
            </li>

            <li>
            <Link href="/menu?category=Main">Main</Link>
            </li>

            <li>
            <Link href="/menu?category=Vegetarian">
                Vegetarian
            </Link>
            </li>

            <li>
            <Link href="/menu?category=Breakfast">
                Breakfast
            </Link>
            </li>
        </ul>
        </nav>
    </aside>

    <section className="menu-content">
        {children}
    </section>
    </div>
);
}