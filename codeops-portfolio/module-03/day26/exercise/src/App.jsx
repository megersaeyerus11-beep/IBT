import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import Main from './component/Main/Main'
import sideBar from './component/Main/sideBar/sideBar'
import './App.css'

function App() {
  return (
    <>
      <Header>
      <h1>Addis Eats</h1>
      <p>Welcome to Addis Eats</p>
      </Header>

    <div className ="layout">
      <sideBar>
        <h1>sideBar</h1>
      </sideBar>
      <Main>
        <h1>Dish</h1>
      </Main>
    </div>

      <Footer>
        <h1>footer</h1>
      </Footer>
    </>
  )
}


export default App
