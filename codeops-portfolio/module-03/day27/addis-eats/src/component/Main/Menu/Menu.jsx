import Dish from './Card/Dish/Dish'
import Card from '../Card/Card'

const dishes = [
  {
    id: 1,
    name: 'Doro Wat',
    category: 'Main',
    price: 240,
    spicy: true,
    image: '/images/doro-wot.jpg',
  },
  {
    id: 2,
    name: 'Shiro',
    category: 'Vegetarian',
    price: 120,
    spicy: false,
    image: '/images/shiro.jpg',
  },
  {
    id: 3,
    name: 'Kitfo',
    category: 'Main',
    price: 320,
    spicy: true,
    image: '/images/kitfo.jpg',
  },
  {
    id: 4,
    name: 'Tibs',
    category: 'Main',
    price: 280,
    spicy: true,
    image: '/images/tibs.jpg',
  },
  {
    id: 5,
    name: 'Injera Firfir',
    category: 'Breakfast',
    price: 100,
    spicy: true,
    image: '/images/injera-firfir.jpg',
  },
  {
    id: 6,
    name: 'Beyaynetu',
    category: 'Vegetarian',
    price: 150,
    spicy: false,
    image: '/images/beyaynetu.jpg',
  },
  {
    id: 7,
    name: 'Misir Wat',
    category: 'Vegetarian',
    price: 110,
    spicy: true,
    image: '/images/misir-wat.jpg',
  },
  {
    id: 8,
    name: 'Gomen',
    category: 'Vegetarian',
    price: 90,
    spicy: false,
    image: '/images/gomen.jpg',
  },
  {
    id: 9,
    name: 'Atkilt Wot',
    category: 'Vegetarian',
    price: 100,
    spicy: false,
    image: '/images/atkilt-wot.jpg',
  },
  {
    id: 10,
    name: 'Derek Tibs',
    category: 'Main',
    price: 310,
    spicy: true,
    image: '/images/derek-tibs.jpg',
  },
  {
    id: 11,
    name: 'Key Wat',
    category: 'Main',
    price: 220,
    spicy: true,
    image: '/images/key-wat.jpg',
  },
  {
    id: 12,
    name: 'Alicha Wat',
    category: 'Main',
    price: 210,
    spicy: false,
    image: '/images/alicha-wat.jpg',
  },
  {
    id: 13,
    name: 'Bozena Shiro',
    category: 'Main',
    price: 180,
    spicy: true,
    image: '/images/bozena-shiro.jpg',
  },
  {
    id: 14,
    name: 'Ayibe',
    category: 'Side',
    price: 70,
    spicy: false,
    image: '/images/ayibe.jpg',
  },
  {
    id: 15,
    name: 'Kocho',
    category: 'Side',
    price: 60,
    spicy: false,
    image: '/images/kocho.jpg',
  },
  {
    id: 16,
    name: 'Enkulal Firfir',
    category: 'Breakfast',
    price: 110,
    spicy: true,
    image: '/images/enkulal-firfir.jpg',
  },
  {
    id: 17,
    name: 'Fuul',
    category: 'Breakfast',
    price: 90,
    spicy: true,
    image: '/images/fuul.jpg',
  },
  {
    id: 18,
    name: 'Genfo',
    category: 'Breakfast',
    price: 130,
    spicy: true,
    image: '/images/genfo.jpg',
  },
  {
    id: 19,
    name: 'Chechebsa',
    category: 'Breakfast',
    price: 120,
    spicy: true,
    image: '/images/chechebsa.jpg',
  },
  {
    id: 20,
    name: 'Kik Alicha',
    category: 'Vegetarian',
    price: 100,
    spicy: false,
    image: '/images/kik-alicha.jpg',
  },
]

const Menu = ({ selectedCategory = 'All' }) => {
  const filteredDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory)

  return (
    <section className="menu">
      <h1>Menu</h1>

      {filteredDishes.length === 0 ? (
        <p className="empty">No dishes found in this category.</p>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <Card key={dish.id}>
              <Dish
                name={dish.name}
                category={dish.category}
                price={dish.price}
                image={dish.image}
                spicy={dish.spicy}
              />
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export default Menu