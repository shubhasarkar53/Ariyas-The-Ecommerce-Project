/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./OrderSuccess.scss";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import Meta from "../../Meta";
const OrderSuccess = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const { order, loading } = useSelector((state) => state.order);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Meta title="Order Success" />
          <div className="wrapper_confirm">

            <div className="order__success">
              <span>✓</span> Order Placed Successfully
            </div>
            <p className="message">
              Hello {user.name},
              <br />Thank you for your order. We&apos;ll send a
              confirmation when your order ships. Your estimated delivery date is
              indicated below.
              <br />If you would like to view the status of your order or
              make any changes to it, please visit Your Orders on Ariyas.in.
            </p>

            <div className="details_tab">


              <div className="details_tab_left">
                <p className="summary_title">
                  Expected Arriving Date:
                  <br />
                  {new Date().toLocaleDateString()}
                </p>
                <div className="summary">
                  <p className="summary_title-2">Order Summary</p>
                  <p>
                    Subtotal: <span>₹{order.newOrder.orderItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}</span>
                  </p>
                  <p>
                    Shipping: <span>₹{order.newOrder.shippingPrice}</span>
                  </p>
                  <p>
                    Tax: <span>₹{order.newOrder.totalPrice * 0.18}</span>
                  </p>
                  <p>
                    Total: <span>₹{order.newOrder.totalPrice}</span>
                  </p>
                </div>
              </div>

              <div className="details_tab_right">
                <p className="address_title">Shipping Address</p>
                <p className="address">
                  {user.name}
                  <br />
                  {order.newOrder.shippingInfo.state}
                  <br />
                  {order.newOrder.shippingInfo.country}
                  <br />
                  {order.newOrder.shippingInfo.phoneNo}
                  <br />
                  {order.newOrder.shippingInfo.address}
                  <br />
                  {order.newOrder.shippingInfo.city}
                  <br />
                  {order.newOrder.shippingInfo.landmark}
                  <br />
                  {order.newOrder.shippingInfo.pinCode}
                </p>
              </div>


            </div>

            <div className="order__btn">
              <Link className="btn" to="/">Continue Shopping</Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

OrderSuccess.propTypes = {
  history: PropTypes.object.isRequired,
};

export default OrderSuccess;
