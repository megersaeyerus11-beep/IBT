
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.SITE_URL || "https://addis-eats.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Addis Eats | Ethiopian Food Delivery",
    template: "%s | Addis Eats",
  },

  description:
    "Explore Ethiopian dishes, order your favorites, and enjoy Addis Eats.",

  applicationName: "Addis Eats",

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Addis Eats",
    title: "Addis Eats | Ethiopian Food Delivery",
    description:
      "Discover Ethiopian favorites with Addis Eats.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addis Eats Ethiopian food delivery",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Ethiopian Food Delivery",
    description:
      "Discover Ethiopian favorites with Addis Eats.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
