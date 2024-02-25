/* eslint-disable no-unused-vars */
import React from 'react'
// import { BrowserRouter as Router} from "react-router-dom";
import Header from './Components/Layout/Header/Header'
import "./App.css"
import Footer from './Components/Layout/Footer/Footer.jsx'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails.jsx'
import Shop from './Components/Shop/Shop.jsx'
import Search from './Components/Search/Search.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        
          <Header/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route path="/search" component={Search} />
            <Route exact path="/product/:id" component={ProductDetails} />

          </Switch>

         
          <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App

