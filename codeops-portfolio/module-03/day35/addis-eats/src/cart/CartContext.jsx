import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add a dish to the cart
  function addToCart(dish) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...dish,
          quantity: 1,
        },
      ];
    });
  }

  // Increase quantity
  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove completely
  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  }

  // Empty the whole cart
  function clearCart() {
    setCart([]);
  }

  // Total number of dishes
  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const total = cart.reduce(
    (sum, item) =>
      sum + item.priceETB * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}