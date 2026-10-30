"use client";

import { CartProvider } from "@/app/cart/CartContext";

export default function Providers({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}