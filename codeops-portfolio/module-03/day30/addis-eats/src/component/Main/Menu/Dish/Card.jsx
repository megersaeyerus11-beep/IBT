import PropTypes from "prop-types";

function Card({ id, children }) {
    return (
        <div className='card' id={id}>
            {children}
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
};

export default Card;