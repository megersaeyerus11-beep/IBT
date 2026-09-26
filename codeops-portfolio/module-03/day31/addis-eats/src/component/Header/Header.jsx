import './Header.css'
import { useCart } from '../../cart/CartContext'

function Header(){
    const { items } = useCart()
    const count = items.reduce((sum, item) => sum + item.qty, 0)

    return(
        <div className='main-heading'>
            <h1 className='heading-title'>
                Habesha Eater <span className="cart-badge">🛒 {count}</span>
            </h1>
        </div>
    )
}
export default Header;