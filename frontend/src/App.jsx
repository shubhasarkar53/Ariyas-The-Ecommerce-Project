import React from 'react'
import Header from './Components/Layout/Header/Header'
import "./App.css"
import Footer from './Components/Layout/Footer/Footer'
import Home from './Components/Home/Home'
const App = () => {
  return (
    <div>
      <div className='wrapper'>
          <Header/>
          <Home/>
          <Footer/>
      </div>
    </div>
  )
}

export default App