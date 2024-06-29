/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Typography } from "@mui/material";
import "./ConfirmOrder.scss";
import PropTypes from "prop-types";
import { createOrder, clearErrors } from "../../Redux/Actions/orderAction";
import { clearCart } from "../../Redux/Actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import DotLoader from "../Loader/DotLoader";
import Meta from "../../Meta";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const addresses = useSelector((state) => state.addresses.addresses);
  const { error, loading, orderInfo } = useSelector((state) => state.order);

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
  const totalPrice = Math.ceil(subTotal + shippingCharges);


  const orderItems = cartItems.map(item => ({
    ...item,
    seller: item.seller // Assuming you have seller information in each cart item
  }));

  console.log("----------------------------------")
  console.log("cartitems:", cartItems)
  console.log("----------------------------------")


  const order = {
    orderItems,
    itemsPrice: subTotal,
    shippingPrice: shippingCharges,
    totalPrice,
    shippingInfo: {
      fullName: selectedAddress.fullName,
      address: selectedAddress.area,
      landmark: selectedAddress.landmark,
      city: selectedAddress.city,
      state: selectedAddress.state,
      country: selectedAddress.country,
      pinCode: selectedAddress.postalCode,
      phoneNo: selectedAddress.phoneNo,
    },
    paymentInfo: {
      id: "demoId",
      status: "Success",
    },
    paidAt: "COD",
  };
  console.log(order);

  const submitOrderHandler = (e) => {
    e.preventDefault();
    if (!error) {
      dispatch(createOrder(order));
      history.push("/order/success");
    } else {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
    // clear cart after successfully placing order
    dispatch(clearCart());
  };

  // const placeOrderHandler = () => {
  //   clearErrors();
  //   if (!error) {
  //     history.push("/success");
  //   }
  // };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, history]);

  return (
    <>
      {loading ? (
        <DotLoader />
      ) : (
        <Fragment>
          <Meta title="Confirm Order" />
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
                          <strong>PostalCode:</strong>{" "}
                          {selectedAddress.postalCode}
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
              <Typography className="subHeading-cart">
                Your Cart Items:
              </Typography>
              <div className="cartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="cartItem" key={item.product}>
                      <img
                        className="cartItemImg"
                        src={item.image}
                        alt="Product"
                      />
                      <div className="items-details">
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
                <p className="cartGrossPrice">
                  ₹{totalPrice}
                </p>
              </div>

              <div className="checkOut">
                <button className="checkOutBtn" onClick={submitOrderHandler}>
                  {`Pay On Delivery - ₹${totalPrice}`}
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </>
  );
};

ConfirmOrder.propTypes = {
  history: PropTypes.object,
};

export default ConfirmOrder;
