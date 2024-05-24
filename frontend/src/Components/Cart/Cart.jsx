/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import "./Cart.scss";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../Redux/Actions/cartAction";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types';
import Meta from "../../Meta";
// import image
import emptycart from '../../assets/Images/Icons/CartPage/emptycart.png'

const Cart = ({ history }) => {

  const dispatch = useDispatch();

  // Get the cart items from the redux store
  const { cartItems } = useSelector((state) => state.cart);

  // remove the cart items function
  const removeCartItemHandler = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.success("Item removed from cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  // increase the quantity of the cart items
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      // Display toast message indicating that stock is insufficient
      toast.error("Cannot add more items. Insufficient stock.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  }

  // decrease the quantity of the cart items
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  }

  // create a checkout handler 
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  }

  return (
    <Fragment>
      <Meta title="Your Shopping Cart - Ariyas" description="Review the items in your cart and proceed to checkout." />
      {cartItems.length === 0 ? (
        <div className="emptyCart-container">
          <h1>Your Cart is Empty</h1>
          <img src={emptycart} alt="empty cart" />
          <Link className="empty-cart-btn" to="/shop">Shop Now</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage-main-container">
            <div className="cart-header">
              <p className="cart-title">Shopping Cart</p>
              <p className="cart-quantity">Quantity</p>
              <p className="cart-total-price">Total Price</p>
            </div>

            {cartItems && cartItems.map((item) => (
              <div className="cartCardContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={removeCartItemHandler} />

                <div className="quantity">
                  <button onClick={() =>
                    decreaseQuantity(item.product, item.quantity)}>-</button>
                  <input readOnly type="number" value={item.quantity} />
                  <button onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                </div>

                <p className="cartSubTotal">{`₹ ${item.price * item.quantity}`}</p>
              </div>
            ))}

            <div className="cartGrossPrice-container">

              <div className="bar"></div>

              <div className="cartGrossTotalBox">
                <p className="cartGrossTotal">Gross Total</p>
                <p className="cartGrossPrice">{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
              </div>

              <div className="checkOut">
                <button className="checkOutBtn" onClick={checkoutHandler} >Check Out</button>
              </div>

            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

Cart.propTypes = {
  history: PropTypes.object.isRequired
};

export default Cart;
