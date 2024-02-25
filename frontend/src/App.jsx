/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './Components/Layout/Header/Header'
import "./App.css"
import Footer from './Components/Layout/Footer/Footer.jsx'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails.jsx'
import Login from './Components/User/Login.jsx'
import Register from './Components/User/Register.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        
          <Header/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register/new" component={Register}/>
          </Switch>

         
          <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App

