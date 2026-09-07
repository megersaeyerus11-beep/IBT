import { useState, createContext,useEffect } from "react"
import App from "./App"
export const dataProvider = createContext(null)

function Provider({children}) {
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)


    function Add(price){
        setCount(a => a + 1)
        setTotal(b => b + price)
  }

   useEffect(()=>{
    console.log("count and total in app", count , "/", total)

  },[count])


  
    

  return (
    <dataProvider.Provider value={{Add,count,total,setTotal}}>
       {children}
    </dataProvider.Provider>
  )
}

export default Provider