import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian food ordering application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-container">
            <Link href="/" className="logo">
              Addis Eats
            </Link>

            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer">
          <p>Addis Eats · Bole, Addis Ababa · TeleBirr</p>
        </footer>
      </body>
    </html>
  );
}