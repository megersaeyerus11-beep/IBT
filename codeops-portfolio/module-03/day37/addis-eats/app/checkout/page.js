```jsx
export const dynamic = "force-dynamic";

// Checkout reads request-specific information
// such as cookies/session data, so this route
// must be rendered dynamically.

export default function CheckoutPage() {
  return (
    <main className="container">
      <h1>Checkout</h1>

      <p>Complete your order.</p>

      {/* Your checkout form goes here */}
    </main>
  );
}
```
