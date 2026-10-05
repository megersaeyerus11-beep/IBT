export const dynamic = "force-dynamic";

export default function CheckoutPage() {
return (
    <main>
    <h1>Checkout</h1>

    <form>
        <div>
        <label htmlFor="name">Name</label>
        <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
        />
        </div>

        <div>
        <label htmlFor="phone">TeleBirr Phone</label>
        <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxx"
            required
        />
        </div>

        <div>
        <label htmlFor="area">Area</label>
        <select id="area" name="area" required>
            <option value="">Select your area</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
        </select>
        </div>

        <div>
        <label htmlFor="notes">Notes</label>
        <textarea
            id="notes"
            name="notes"
            placeholder="Optional delivery notes"
            rows="4"
        />
        </div>

        <button type="submit">Place Order</button>
    </form>
    </main>
);
}