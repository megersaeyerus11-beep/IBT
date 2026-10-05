import "./globals.css";
import Header from "./header";
import Footer from "./footer";

export const metadata = {
  title: "Addis Eats",
  description: "Order delicious Ethiopian food with Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="site-main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}