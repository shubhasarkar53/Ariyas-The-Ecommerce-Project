/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./OrderSuccess.scss";
import PropTypes from "prop-types";
const OrderSuccess = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const { order,newOrder} = useSelector((state) => state.order);

  const subTotal = order.newOrder.orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges2 = order.newOrder.shippingPrice; 


  const tax = subTotal * 0.18; //tax is set to be 18%

  const totalPrice = order.newOrder.totalPrice;

  const add1 = order.newOrder.shippingInfo.state;
  const add2 = order.newOrder.shippingInfo.country;
  const add3 = order.newOrder.shippingInfo.phoneNo;

  return (
    <Fragment>
      <div className="wrapper_confirm">
        <div className="order__success">Order Placed Successfully</div>
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
                Subtotal: <span>₹{subTotal}</span>
              </p>
              <p>
                Shipping: <span>₹{shippingCharges2}</span>
              </p>
              <p>
                Tax: <span>₹{tax}</span>
              </p>
              <p>
                Total: <span>₹{totalPrice}</span>
              </p>
            </div>
          </div>

          <div className="details_tab_right">
            <p className="address_title">Shipping Address</p>
            <p className="address">
              {user.name}
              <br />
              {add1}
              <br />
              {add2}
              <br />
              {add3}
            </p>
          </div>


        </div>

        <div className="order__btn">
          <Link className="btn" to="/">Continue Shopping</Link>
        </div>
      </div>
    </Fragment>
  );
};

OrderSuccess.propTypes = {
  history: PropTypes.object.isRequired,
};

export default OrderSuccess;
