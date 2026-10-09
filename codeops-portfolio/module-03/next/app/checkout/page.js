import CheckoutForm from "../components/CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <section>
      <h2>Checkout</h2>
      <p>Enter your details to place your order.</p>
      <CheckoutForm />
    </section>
  );
}