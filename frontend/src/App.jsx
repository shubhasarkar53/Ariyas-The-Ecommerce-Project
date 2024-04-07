/* eslint-disable no-unused-vars */

import React from "react";
import { useEffect } from "react";
import Header from "./Components/Layout/Header/Header";
import "./App.css";
import Footer from "./Components/Layout/Footer/Footer.jsx";
import Home from "./Components/Home/Home";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import ProductDetails from "./Components/Product/ProductDetails/ProductDetails.jsx";
import Login from "./Components/User/Login.jsx";
import Register from "./Components/User/Register.jsx";
import React, { useState } from 'react'
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
import { loadUser } from "./Redux/Actions/userAction.js";
import Shop from "./Components/Shop/Shop.jsx";
import Search from "./Components/Search/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Components/Routes/ProtectedRoute.jsx";
import Sale from "./Components/Sale/Sale.jsx";
import About from "./Components/About/About";
import PageNotFound from "./Components/404error/PageNotFound.jsx";
import BecomeSeller from "./Components/Seller/BecomeSeller.jsx";
import Profile from "./Components/Dashboard/Profile.jsx";
import RegisterSeller from "./Components/Seller/Register-Seller/RegisterSeller";
import Contact from "./Components/Contact/Contact.jsx";
import FAQs from "./Components/FAQ/FAQ.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import UpdateProfile from "./Components/Dashboard/UpdateProfile.jsx";
import UpdatePassword from "./Components/Dashboard/UpdatePassword.jsx";
import AddressesPage from "./Components/Dashboard/Address/AddressesPage.jsx";
import NewAddress from "./Components/Dashboard/Address/NewAddress.jsx";
import EditAddressPage from "./Components/Dashboard/Address/EditAddressPage.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import CreateNewProduct from "./Components/Admin/AdminFunctions/CreateNewProduct.jsx";
import CreatedProducts from "./Components/Admin/AdminFunctions/CreatedProducts.jsx";
import ProtectedRoute from './Components/Routes/ProtectedRoute.jsx'
import Sale from './Components/Sale/Sale.jsx'
import About from './Components/About/About';
import PageNotFound from './Components/404error/PageNotFound.jsx'
import BecomeSeller from './Components/Seller/BecomeSeller.jsx'
import Profile from './Components/Dashboard/Profile.jsx'
import RegisterSeller from './Components/Seller/Register-Seller/RegisterSeller';
import Contact from './Components/Contact/Contact.jsx'
import FAQs from './Components/FAQ/FAQ.jsx'
import Cart from './Components/Cart/Cart.jsx'
import WishList from './Components/WishList/WishList.jsx'
import UpdateProfile from './Components/Dashboard/UpdateProfile.jsx'
import UpdatePassword from './Components/Dashboard/UpdatePassword.jsx'
import AddressesPage from './Components/Dashboard/Address/AddressesPage.jsx'
import NewAddress from './Components/Dashboard/Address/NewAddress.jsx'
import EditAddressPage from './Components/Dashboard/Address/EditAddressPage.jsx'
// import CheckoutPage from './Components/Order/CheckoutPage.jsx'
import AddressSelectionPage from './Components/PlaceOrder/AddressSelectionPage.jsx'
import PaymentPage from './Components/PlaceOrder/PaymentPage.jsx'
import OrderConfirmationPage from './Components/PlaceOrder/OrderSummaryPage.jsx'
import OrderSuccessPage from './Components/PlaceOrder/OrderSuccessPage.jsx'
import axios from 'axios'

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    // if(!isAuthenticated){
    //   store.dispatch(loadUser())
    // }
    store.dispatch(loadUser());
  }, []); //assumtion:in future there may be problem beacuse of no dependency in the array but curretly ok.
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []) //assumtion:in future there may be problem beacuse of no dependency in the array but curretly ok. 

  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <section className="header-part">
            <Header />
          </section>
          <section className="page-mid-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/sale" component={Sale} />
              <Route exact path="/shop" component={Shop} />
              <Route
                path="/products/:keyword"
                render={(props) => <Shop {...props} />}
              />
              {/* <Route path="/products/:keyword" component={Shop} /> */}
              <Route path="/products/:keyword" component={Shop} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/wishlist" component={WishList} />
              <Route exact path="/about" component={About} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/product/:id" component={ProductDetails} />
        <div className='wrapper'>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sale" component={Sale} />
            <Route exact path="/shop" component={Shop} />
            <Route path="/products/:keyword" render={(props) => <Shop {...props} />} />
            {/* <Route path="/products/:keyword" component={Shop} /> */}
            <Route path="/products/:keyword" component={Shop} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/wishlist" component={WishList} />
            <Route exact path="/about" component={About} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/product/:id" component={ProductDetails} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register/new" component={Register} />

              <Route exact path="/register/new" component={Register} />

              <Route exact path="/become-seller" component={BecomeSeller} />
              <Route path="/register-seller" component={RegisterSeller} />

              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute
                exact
                path="/me/update/profile"
                component={UpdateProfile}
              />
              <ProtectedRoute
                exact
                path="/password/update"
                component={UpdatePassword}
              />
              <ProtectedRoute
                exact
                path="/addresses"
                component={AddressesPage}
              />
              <ProtectedRoute
                exact
                path="/new/address"
                component={NewAddress}
              />
              <ProtectedRoute
                exact
                path="/address/edit/:id"
                component={EditAddressPage}
              />
              <ProtectedRoute exact path="/admin" component={AdminDashboard} />
              <ProtectedRoute
                exact
                path="/newProduct/create"
                component={CreateNewProduct}
              />
              <ProtectedRoute
                exact
                path="/yourProducts"
                component={CreatedProducts}
              />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/me/update/profile" component={UpdateProfile} />
            <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

            <ProtectedRoute exact path="/addresses" component={AddressesPage} />


            <ProtectedRoute exact path="/order/confirm" component={OrderConfirmationPage} />

            <ProtectedRoute exact path="/order/success" component={OrderSuccessPage} />


            <ProtectedRoute exact path="/select-address" component={AddressSelectionPage} />
            <ProtectedRoute exact path="/new/address" component={NewAddress} />
            <ProtectedRoute exact path="/address/edit/:id" component={EditAddressPage} />

              <Route exact path="/contact" component={Contact} />
              <Route exact path="/faq" component={FAQs} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/faq" component={FAQs} />


            {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={PaymentPage} />
            </Elements>
          )}

              {/* This will catch all the routes that do not exist */}
              <Route component={PageNotFound} />
            </Switch>
          </section>
          
          <section className="footer-part">
            <Footer />
          </section>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
