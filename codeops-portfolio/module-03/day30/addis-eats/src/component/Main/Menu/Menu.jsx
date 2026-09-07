import './Menu.css'
import Dish from './Dishes/Dish'
import { useMemo } from 'react'
import { useFetch } from '../../../hooks/useFetch'

function Products({ category }) {
    const { data, loading, error } = useFetch('/dishes.json')

    
    const filteredDishes = useMemo(() => {
        if (!data) return []
        return category === "All"
            ? data
            : data.filter(item => item.category.trim().toLowerCase() === category.trim().toLowerCase())
    }, [data, category])

    return (
        <div className='dish-grid'>
            <h3 className="menu">Products Menu</h3>

            {loading && <p className="empty-state">Loading menu…</p>}
            {error && <p className="empty-state">Could not load the menu: {error}</p>}

            {!loading && !error && (
                <div className='item'>
                    {filteredDishes.length === 0 ? (
                        <p className="empty-state">No dishes found for "{category}".</p>
                    ) : (
                        filteredDishes.map(value => (
                            <Dish
                                key={value.id}
                                id={value.id}
                                name={value.name}
                                price={value.price}
                                spicy={value.spicy}
                                category={value.category}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Products