import './Main.css'

import CatagoryBar from "./Sidebar/CatagoryBar"
import Menu from "./Menu/Menu"
import Checkout from "./Checkout/Checkout"
import { useState } from 'react'

function Main() {
    const [category, setCategory] = useState("All")

    return (
        <div className="container-grid">
            <CatagoryBar selected={category} onSelect={setCategory} />
            <Menu category={category} />
            <Checkout />
        </div>
    )
}

export default Main