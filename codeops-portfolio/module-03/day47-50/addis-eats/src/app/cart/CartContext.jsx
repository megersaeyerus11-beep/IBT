"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);

  // Check whether the visitor is signed in.
  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const response = await fetch("/api/session", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not load session");
        }

        const data = await response.json();

        // Supports common session API response shapes.
        const signedInUser =
          data?.user ??
          data?.session?.user ??
          (data?.authenticated ? data : null);

        if (cancelled) return;

        setUser(signedInUser);

        // Load the cart only for a signed-in user.
        if (signedInUser) {
          try {
            const savedCart = localStorage.getItem(STORAGE_KEY);
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];

            setItems(Array.isArray(parsedCart) ? parsedCart : []);
          } catch {
            setItems([]);
          }
        } else {
          setItems([]);
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Session check failed:", error);
          setUser(null);
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setSessionReady(true);
        }
      }
    }

    loadSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // Save cart changes for the signed-in user.
  useEffect(() => {
    if (!sessionReady) return;

    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [items, user, sessionReady]);

  // Add a dish, or increase its quantity if it is already in the cart.
  const addItem = useCallback(
    (dish) => {
      if (!user || !dish?.id) return;

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === dish.id
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [
          ...currentItems,
          {
            ...dish,
            // Keep a consistent price field for cart calculations.
            priceETB: Number(dish.priceETB ?? dish.price ?? 0),
            quantity: 1,
          },
        ];
      });
    },
    [user]
  );

  // Decrease quantity by one; remove the dish when it reaches zero.
  const decreaseItem = useCallback((dishId) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Remove a dish completely.
  const removeItem = useCallback((dishId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== dishId)
    );
  }, []);

  // Set a dish quantity directly.
  const updateQuantity = useCallback((dishId, quantity) => {
    const safeQuantity = Math.max(0, Number(quantity) || 0);

    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === dishId
            ? { ...item, quantity: safeQuantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalETB = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + Number(item.priceETB ?? item.price ?? 0) * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      user,
      sessionReady,
      addItem,
      decreaseItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalETB,

      // Alias some common cart total names for convenience.
      cartTotal: totalETB,
      cartCount: totalItems,
    }),
    [
      items,
      user,
      sessionReady,
      addItem,
      decreaseItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalETB,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }

  return context;
}