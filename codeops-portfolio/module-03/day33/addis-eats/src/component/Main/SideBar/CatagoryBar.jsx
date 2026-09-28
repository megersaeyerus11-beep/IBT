import './CatagoryBar.css'

const categories = ["All", "Main", "Vegetarian", "Breakfast", "Side"]

function CatagoryBar({ selected, onSelect }) {
    return (
        <div className='sidebar'>
            <h3>Categories</h3>
            <ul className="category-list">
                {categories.map(cat => (
                    <li key={cat}>
                        <button
                            className={cat === selected ? "active" : ""}
                            onClick={() => onSelect(cat)}
                        >
                            {cat}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CatagoryBar;