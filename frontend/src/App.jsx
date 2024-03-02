/* eslint-disable no-unused-vars */

import React from 'react'
import { useEffect } from 'react'
import Header from './Components/Layout/Header/Header'
import "./App.css"
import Footer from './Components/Layout/Footer/Footer.jsx'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails.jsx'
import Login from './Components/User/Login.jsx'
import Register from './Components/User/Register.jsx'
import store from "./Redux/Store/store.js";
import { loadUser } from './Redux/Actions/userAction.js';
import Shop from './Components/Shop/Shop.jsx'
import Search from './Components/Search/Search.jsx'
import { useDispatch, useSelector } from "react-redux";
import Account from './Components/User/Account.jsx'
import Sale from './Components/Sale/Sale.jsx'
import About from './Components/About/About';
import PageNotFound from './Components/404error/PageNotFound.jsx'
import BecomeSeller from './Components/Seller/BecomeSeller.jsx'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sale" component={Sale} />
            <Route exact path="/shop" component={Shop} />
            <Route path="/products/:keyword" render={(props) => <Shop {...props} />} />
            {/* <Route path="/products/:keyword" component={Shop} /> */}
            <Route path="/products/:keyword" component={Shop} />
            <Route exact path="/about" component={About} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/product/:id" component={ProductDetails} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register/new" component={Register} />
            <Route exact path="/account" component={Account} />

            <Route exact path="/become-seller" component={BecomeSeller} />

            {/* This will catch all the routes that do not exist */}
            <Route component={PageNotFound} />
          </Switch>

          <Footer />

        </div>
      </BrowserRouter>
    </>
  )
}

export default App

