import './Checkout.css'
import { useCart } from '../../../cart/CartContext'

function Checkout() {
    const { items, total, dispatch } = useCart()

    return (
        <div className="checkout">
            <h3>Your Order</h3>

            {items.length === 0 ? (
                <p className="empty-state">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="checkout-list">
                        {items.map(item => (
                            <li key={item.id}>
                                <span>{item.name} × {item.qty}</span>
                                <span>{item.price * item.qty} ETB</span>
                                <button
                                    aria-label={`Remove ${item.name}`}
                                    onClick={() => dispatch({ type: 'REMOVE', payload: { id: item.id } })}
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="checkout-total">Total: {total} ETB</p>
                    <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR' })}>
                        Clear cart
                    </button>
                </>
            )}
        </div>
    )
}

export default Checkout