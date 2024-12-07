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
import Shipping from "./Components/Cart/Shipping.jsx";
import ConfirmOrder from "./Components/Cart/ConfirmOrder.jsx";
import EditProduct from "./Components/Admin/AdminFunctions/EditProduct.jsx";
import OrderSuccess from "./Components/Cart/OrderSuccess.jsx";
import MyOrders from "./Components/Order/MyOrders.jsx";
import ViewOrderDetails from "./Components/Order/ViewOrderDetails.jsx";
import TermsConditions from "./Components/About/TermsConditions.jsx";
import IncomingOrders from "./Components/Admin/AdminFunctions/IncomingOrders.jsx";
import ForgotPassword from "./Components/User/ForgotPassword.jsx";
import ResetPassword from "./Components/User/ResetPassword.jsx";
// import IncomingOrders from "./Components/Admin/AdminFunctions/IncomingOrders.jsx";
import Location from "./Components/Location/Location.jsx";

import ConfirmEmailScreen from "./Components/User/ConfirmEmailScreen.jsx";
// import IncomingOrders from "./Components/Admin/AdminFunctions/IncomingOrders.jsx";
import ScrollToTop from "./ScrollToTop.js";
import UpdateAuthorization from "./Components/Admin/AdminFunctions/UpdateAuth.jsx";
// import { useLocation } from "react-router-dom";
import BlogPage from "./Components/Blog/BlogPage/BlogPage.jsx";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails.jsx";
import CreateBlogs from "./Components/Admin/AdminFunctions/CreateBlogs.jsx";
import CreatedBlogs from "./Components/Admin/AdminFunctions/CreatedBlogs.jsx";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className="wrapper">
          <section className="header-part">
            <Header />
          </section>
          <section className="page-mid-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/sale" component={Sale} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/location" component={Location} />
              <Route exact path="/blog" component={BlogPage} />
              <Route exact path="/blogs/:id" component={BlogDetails} />

              <Route
                path="/products/:keyword"
                render={(props) => <Shop {...props} />}
              />
              {/* <Route
                path="/products/:location"
                render={(props) => <Shop {...props} />}
              /> */}

              {/* <Route path="/products/:keyword" component={Shop} /> */}

              <Route exact path="/cart" component={Cart} />
              <Route exact path="/wishlist" component={WishList} />
              <Route exact path="/about" component={About} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/product/:id" component={ProductDetails} />


              <Route exact path="/login" component={Login} />
              <Route exact path="/register/new" component={Register} />
              <Route
                exact
                path="/confirm-email"
                component={ConfirmEmailScreen}
              />

              <ProtectedRoute exact path="/become-seller" component={BecomeSeller} />
              <ProtectedRoute path="/register-seller" component={RegisterSeller} />

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
              <ProtectedRoute
                exact
                path="/authorization"
                component={UpdateAuthorization}
              />
              <ProtectedRoute
                exact
                path="/edit-product/:id"
                component={EditProduct}
              />

              <ProtectedRoute exact path="/shipping" component={Shipping} />

              <ProtectedRoute
                exact
                path="/order/success"
                component={OrderSuccess}
              />

              <ProtectedRoute
                exact
                path="/order/confirm"
                component={ConfirmOrder}
              />

              <ProtectedRoute exact path="/orders/me" component={MyOrders} />

              <ProtectedRoute
                exact
                path="/order/:id"
                component={ViewOrderDetails}
              />

              <ProtectedRoute
                exact
                path="/incoming-orders"
                component={IncomingOrders}
              />

              <ProtectedRoute
                exact
                path="/blog/new"
                component={CreateBlogs}
              />

              <ProtectedRoute
                exact
                path="/blog/manage"
                component={CreatedBlogs}
              />

              <Route exact path="/password/forgot" component={ForgotPassword} />

              <Route
                exact
                path="/password/reset/:token"
                component={ResetPassword}
              />

              <Route exact path="/contact" component={Contact} />

              <Route exact path="/faq" component={FAQs} />
              <Route
                exact
                path="/terms-conditions"
                component={TermsConditions}
              />

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
