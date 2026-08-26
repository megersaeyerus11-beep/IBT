import React from 'react'

const Dish = ({ name, price, image }) => {
    return (
    <div className="dish">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{price} ETB</p>
    </div>
    );
};

export default Dish;


