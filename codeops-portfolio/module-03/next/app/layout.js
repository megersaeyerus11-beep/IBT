
import Header from "./header";
import Footer from "./footer";
import Providers from "./Providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />

          <main className="site-main">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}