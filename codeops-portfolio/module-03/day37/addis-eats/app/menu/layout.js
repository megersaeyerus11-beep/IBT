```jsx
import CategorySidebar from "../../components/CategorySidebar";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <CategorySidebar />
      </aside>

      <section className="menu-content">
        {children}
      </section>
    </div>
  );
}
```

