import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from '@redux-devtools/extension';
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  productReducer,
  productDetailsReducer,
  createProductReducer,
  loadCreatedProductReducer,
  createReviewReducer,
  productReducer2
} from "../Reducers/productReducer";

import { forgotPasswordReducer, profileReducer, userReducer } from "../Reducers/userReducer";
import contactReducer from '../Reducers/contactReducer';
import { cartReducer } from "../Reducers/cartReducer";
import { addressReducer } from "../Reducers/addressReducer";
import { wishlistReducer } from '../Reducers/wishlistReducer';
import { orderReducer,myOrderReducer,orderDetailsReducer } from "../Reducers/orderReducer";
import incomingOrdersReducer from "../Reducers/incomingOrderReducer";
import { registerSellerReducer } from "../Reducers/registerSellerReducer";
import { requestedSellerReducer } from "../Reducers/sellerReducer";
import {blogReducer,blogDetailsReducer,createBlogReducer,loadCreatedBlogReducer} from "../Reducers/blogReducer";
// Reducers
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  createProduct: createProductReducer,
  createdProducts: loadCreatedProductReducer,
  user: userReducer,
  profile: profileReducer,
  contact: contactReducer,
  cart: cartReducer,
  addresses: addressReducer,
  wishlist: wishlistReducer,
  registerSeller: registerSellerReducer,
  requestedSellers:requestedSellerReducer,
  order: orderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  createReview: createReviewReducer,
  incomingOrders:incomingOrdersReducer,
  forgotPassword:forgotPasswordReducer,
  blogs:blogReducer,
  blogDetails:blogDetailsReducer,
  createBlog:createBlogReducer,
  createdBlogs:loadCreatedBlogReducer,
  productsall:productReducer2
});



let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [],
  },
  registerSeller: {
    sellerInfo: localStorage.getItem("sellerInfo")
      ? JSON.parse(localStorage.getItem("sellerInfo"))
      : [],
  },
  order: {
    orderInfo: localStorage.getItem("orderInfo")
      ? JSON.parse(localStorage.getItem("orderInfo"))
      : [],
  },
  orderDetails: {
    orderDetails: localStorage.getItem("orderDetails")
      ? JSON.parse(localStorage.getItem("orderDetails"))
      : [],
  },
};


const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;

//This code is written in JavaScript and is using the Redux library to manage state. Here is an explanation of each part of the code:

// The first line imports the createStore function from Redux library.
//The createStore is used to create new Redux store.

// The second line imports the `combineReducers function from Redux.
//This function is used to combine multiple reducer functions into a single reducer function.

// The third line imports the thunk middleware from the redux-thunk library.
//This middleware allows you to write action creators that return functions instead of actions.
//These functions can then be used to dispatch multiple actions asynchronously.

// The fourth line imports the composeWithDevTools function from the @redux-devtools/extension library.
// This function is used to add the Redux DevTools extension to the store.

// The fifth line declares a reducer variable and initializes it to the result of calling
// combineReducers

// with an empty object as the first argument. The combineReducers function is used to combine
// multiple reducer functions into a single reducer function. The store is created with an object
// that contains an empty initialState object.

// The sixth line declares a middleWare array and initializes it with an array that contains
// the thunk middleware.

// The seventh line creates a new Redux store using the createStore function. The store is
//created with the reducer function, the initialState object, and the result of calling
//composeWithDevTools with the applyMiddleware function and the middleWare array.

// The eighth and final line exports the store so that it can be used in other parts of the
//application.

// In summary, this code is creating a new Redux store with a single reducer that is created by
//combining multiple reducers using the combineReducers function. The store is also configured to
// use the thunk middleware and the Redux DevTools extension.
