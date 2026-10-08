"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitOrder } from "./actions";

const initialState = {
  status: null,
  error: "",
  message: "",
fieldErrors: {},
};

function SubmitButton() {
const { pending } = useFormStatus();

return (
    <button type="submit" disabled={pending}>
    {pending ? "Placing order..." : "Place Order"}
    </button>
);
}

export default function CheckoutPage() {
const [state, formAction] = useActionState(
    submitOrder,
    initialState
);

return (
    <main>
    <h1>Checkout</h1>

    {state.error && 
    <p>{state.error}</p>}

    {state.message && 
    <p>{state.message}</p>}

    <form action={formAction}>
        <div>
        <label htmlFor="name">Name</label>

        <input
            id="name"
            name="name"
            type="text"
        />

        {state.fieldErrors?.name && (
            <p>{state.fieldErrors.name}</p>
        )}
        </div>

        <div>
        <label htmlFor="phone">TeleBirr Phone</label>

        <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxx"
        />

        {state.fieldErrors?.phone && (
            <p>{state.fieldErrors.phone}</p>
        )}
        </div>

        <div>
        <label htmlFor="area">Area</label>

        <select id="area" name="area" defaultValue="">
            <option value="">Select area</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
        </select>

        {state.fieldErrors?.area && (
            <p>{state.fieldErrors.area}</p>
        )}
        </div>

        <div>
        <label htmlFor="notes">Notes</label>

        <textarea
            id="notes"
            name="notes"
        />

        {state.fieldErrors?.notes && (
            <p>{state.fieldErrors.notes}</p>
        )}
        </div>

        <SubmitButton />
    </form>
    </main>
);
}