import "./Header.css"
import {useState, useContext} from 'react'
import {dataProvider} from "../Provider"


function Header({currency="ETB"}) {

  const {count,total} = useContext(dataProvider)


  console.log("total is = ",total, "count is = ", count)
  
  return (
    <div className="header">
      
      <div className="logo">
        <h3 className="logo-title">Mame Shop</h3>
      </div>

      <div className="search">
        <label htmlFor="search" ></label>
        <input type="search" id="search" placeholder="Search by category ..."></input>
      </div>

      <div className="cart">
        <h4 className="cart-title">
          cart
        </h4>

        {Boolean(count) && <div>
            <p>{count}</p>
            <p>{total.toFixed(2)}: {currency}</p>
          </div>}

      </div>
    </div>
  )
}

export default Header