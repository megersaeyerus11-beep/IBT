import Footer from "./Component/Footer/Footer"
import Header from "./Component/Header/Header"
import Mains from "./Component/Mains/Mains"
import {useEffect, useState} from 'react'
import {dataProvider} from "./Provider"



import "./App.css"

function App() {

  const [counts, setCount] = useState(0)
  const [total, setTotal] = useState(0)


  return (
    <div className="all-content">
      <Header />
      <Mains />
      <Footer/>
    </div>
  )
}

export default App