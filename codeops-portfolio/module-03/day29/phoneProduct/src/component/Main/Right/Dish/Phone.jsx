import "./Phone.css"
import Card from "./Card"
import {useContext, useState} from 'react'
import {dataProvider} from "../../../Provider"



function Phone({id,name,price,currenc="ETB",imgs=""}) {
  
  const [count, setCount] = useState(0)

  const {Add,setTotal} =  useContext(dataProvider)



    function handlebtn(){
      setCount(b => b + 1)
      console.log("add is ", Add)

      if(Add){Add(price)}
    }

    // console.log(count)

  return (
    <Card>
        <div className="phone-name" id={id}>
          <h3>{name}</h3>
        </div>
        <div className="phone-img">
          {imgs && <img src={imgs}/>}
        </div>
        <h4><span className="phone-price">{price}</span>: {currenc}</h4>
        <button onClick={handlebtn}>Add</button>
        {Boolean(count) && <p>{count}</p>}
    
    </Card>
  )
}

export default Phone