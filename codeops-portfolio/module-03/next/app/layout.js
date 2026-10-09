import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Food ordering application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Addis Eats</h1>

          <nav>
            <a href="/">Home</a>{" "}
            <a href="/menu">Menu</a>{" "}
            <a href="/cart">Cart</a>{" "}
            <a href="/checkout">Checkout</a>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>Addis Eats · Bole, Addis Ababa · TeleBirr</p>
        </footer>
      </body>
    </html>
  );
}