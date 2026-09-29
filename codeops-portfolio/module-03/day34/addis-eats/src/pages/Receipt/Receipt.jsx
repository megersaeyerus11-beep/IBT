import React from "react";
import { Link } from "react-router-dom";

function Receipt() {
  return (
    <main className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-icon">
          ✓
        </div>

        <h1>Order Confirmed!</h1>

        <p>
          Thank you for ordering from Addis Eats.
        </p>

        <p>
          Your food is being prepared.
        </p>

        <Link to="/menu">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default Receipt;