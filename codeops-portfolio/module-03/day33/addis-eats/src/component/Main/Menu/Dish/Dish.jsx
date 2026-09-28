import PropTypes from "prop-types";
import Card from './Card'
import './Dish.css'
import { useCart } from "../../../../cart/CartContext";

function Dish({ id, name, price, spicy, category, currency = "ETB" }) {
    const { dispatch } = useCart()

    function handleClick() {
        dispatch({ type: 'ADD', payload: { id, name, price, category } })
    }

    return (
        <Card id={id}>
            <div className='card-title'>
                <h3>{name}</h3>
            </div>
            <p>{price} {currency}</p>
            {Boolean(spicy) && <p><span className="spicy"> Spicy</span></p>}
            <button onClick={handleClick}>Add to cart</button>
        </Card>
    )
}

Dish.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    category: PropTypes.string,
    currency: PropTypes.string,
};

export default Dish