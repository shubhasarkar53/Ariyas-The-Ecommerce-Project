/* eslint-disable no-unused-vars */
// OrderSummaryPage.js
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Typography } from "@mui/material";
import "./OrderSummaryPage.scss";
import PropTypes from "prop-types";
import { placeOrder } from "../../Redux/Actions/placeOrderAction";

const OrderSummaryPage = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { addresses } = useSelector((state) => state.addresses);
  // const {placeOrder} = useSelector((state) => state.placeOrder);

  const getAddressFromId = (addressId) => {
    return addresses.find((address) => address._id === addressId);
  };

  const dispatch = useDispatch();

  const selectedAddress = getAddressFromId(shippingInfo.address);

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;

  // const proceedToPayment  = () =>{
  //   const data ={
  //     cartItems,
  //     shippingInfo,
  //     user: user._id,
  //     subTotal,
  //     tax,
  //     shippingCharges,
  //     totalPrice
  //   }

  //   // sessionStorage.setItem('orderInfo', JSON.stringify(data))
  //   history.push('/process/payment')
  // }

  if (!shippingInfo || !shippingInfo.address) {
    history.push("/shipping");
  } else {
    const selectedAddress = getAddressFromId(shippingInfo.address);
    if (!selectedAddress) {
      history.push("/shipping");
    }
  }

  const proceedToPayment = () => {
    // const data = {

    //   orderItems: cartItems.map((item) => ({
    //     ...item,
    //     name: item.name,
    //     productId: item.product._id,
    //     image: item.product.image[0].url,
    //     quantity: item.quantity,
    //     price: item.price * item.quantity,
    //   })),
    //   // include cart items in order array 
    //   // orderItems: cartItems,
    //   shippingInfo,
    //   user: user._id,
    //   subTotal,
    //   tax,
    //   shippingCharges,
    //   totalPrice,
    // };

    const data = {
      cartItems,
      shippingInfo,
      user: user._id,
      subTotal,
      tax,
      shippingCharges,
      totalPrice,
    };
    console.log(data);
    dispatch(placeOrder(data));
    history.push("/order/success");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div className="confirmshippingAddress">
          <Typography className="subHeading">Shipping Info</Typography>
          <div className="addressContainer">
            <div className="nameEmailPhone">
              <p>E-mail:</p>
              <span>{user.email}</span>
            </div>

            <div className="nameEmailPhone">
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div className="nameEmailPhone">
              <p>Phone:</p>
              <span>{user.phone}</span>
            </div>
            <div className="nameEmailPhone">
              <p>Address:</p>
              <span className="address_tab">
                {selectedAddress ? (
                  <div className="address_details">
                    <div>
                      <strong>Town:</strong> {selectedAddress.town}
                    </div>
                    <div>
                      <strong>Area:</strong> {selectedAddress.area}
                    </div>
                    <div>
                      <strong>LandMark:</strong> {selectedAddress.landmark}
                    </div>
                    <div>
                      <strong>PostalCode:</strong> {selectedAddress.postalCode}
                    </div>
                    <div>
                      <strong>State:</strong> {selectedAddress.state}
                    </div>
                  </div>
                ) : (
                  "No address found"
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="cartItems">
          <Typography className="subHeading-cart">Your Cart Items:</Typography>
          <div className="cartItemsContainer">
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartItem" key={item.product}>
                  <img className="cartItemImg" src={item.image} alt="Product" />
                  <Link
                    className="cartItemName"
                    to={`/product/${item.product}`}
                  >
                    {item.name}
                  </Link>{" "}
                  <span className="cartItemPrice">
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="totalCartPrice">
          <p className="priceBreakUp">Total Price Breakup</p>

          <div className="total_price">
            <p className="cartGrossTotal">Gross Total:</p>
            <p className="cartGrossPrice">₹{totalPrice}</p>
          </div>

          <div className="total_price_tax">
            <p className="cartGrossTotal">Tax:</p>
            <p className="cartGrossPrice">₹{tax}</p>
          </div>

          <div className="total_price_shipping_charge">
            <p className="cartGrossTotal">Shipping Charge:</p>
            <p className="cartGrossPrice"> ₹{shippingCharges}</p>
          </div>

          <div className="bar"></div>

          <div className="final_price">
            <p className="cartGrossTotal">Total:</p>
            <p className="cartGrossPrice">₹{totalPrice + shippingCharges}</p>
          </div>

          <div className="checkOut">
            <button className="checkOutBtn" onClick={proceedToPayment}>
              {`Pay On Delivery - ₹${totalPrice}`}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

OrderSummaryPage.propTypes = {
  history: PropTypes.object,
};

export default OrderSummaryPage;
