import { useReducer, useMemo } from 'react'
import { CartContext } from './CartContext'
import { cartReducer, initialCartState } from './cartReducer'

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState)

    const total = useMemo(
        () => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
        [state.items]
    )

    
    const value = useMemo(
        () => ({ items: state.items, total, dispatch }),
        [state.items, total]
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider