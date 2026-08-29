import PropTypes from 'prop-types'

const Dish = ({ name, category, price, image, spicy, currency }) => {
  return (
    <article className="dish">
      <img src={image} alt={name} />
      
      {typeof spicy === "boolean" && spicy && (
        <span>Spicy</span>
      )}

      <h3>{name}</h3>

      <p>{category}</p>

      <p>
        {price} {currency}
      </p>

      
    </article>
  )
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  image: PropTypes.string,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
}

Dish.defaultProps = {
  currency: 'ETB',
}

export default Dish