/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "./ViewOrderDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors } from "../../Redux/Actions/orderAction";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const ViewOrderDetails = ({ match }) => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsContainer">
            <h1>{user.name}&apos;s Order Details</h1>
            <div className="orderDetailsHeader">
              {/* order details  */}
              <div className="orderDetailsLeft">
                <h1>Order Details</h1>
                <p className="orderDetailsId">
                  <b>Order ID:</b> {order && order._id}
                </p>
                <p className="orderDetailsId">
                  <b>Order Date:</b> {order && order.createdAt.substring(0, 10)}
                </p>
                <p className="orderDetailsId">
                  <b>Order Amount:</b> ${order && order.totalPrice}
                </p>
                <p className="orderDetailsId">
                  <b>Order Status:</b>
                  {order && order.orderStatus}
                </p>
              </div>

              {/* payment info  */}

              <div className="paymentInfo">
                <h1>Payment Info</h1>
                <p>
                  <b>Amount:</b> ${order && order.totalPrice}
                </p>
                <p>
                  <b>Method:</b> Cash On Delivery
                </p>
              </div>

              {/* shipping info */}
              <div className="shippingInfo">
                <h1>Shipping Info</h1>
                <p>
                  <b>Name:</b> {order && order.user && order.user.name}
                </p>
                <p>
                  <b>Phone:</b>{" "}
                  {order && order.shippingInfo && order.shippingInfo.phoneNo}
                </p>
                <p>
                  <b>Address:</b>{" "}
                  <div className="addDetailsTab">
                    {order && order.shippingInfo && (
                      <div className="addressItem">
                        <span>{order.shippingInfo.address}</span>
                        <span>{order.shippingInfo.city}</span>
                        <span>{order.shippingInfo.state}</span>
                        <span>{order.shippingInfo.country}</span>
                        <span>{order.shippingInfo.pinCode}</span>
                      </div>
                    )}
                  </div>
                </p>
              </div>
            </div>

            <div className="orderDetailsContainerBox">
              <div className="orderDetailsContainerBoxItem">
                <h1>Item&apos;s</h1>
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="items">
                      <img src={item.image} alt="Product" className="imgItem" />
                      <Link
                        className="productLink"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                      <p className="itemQnt">
                        {item.quantity} X &#8377;{item.price} = &#8377;
                        {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

ViewOrderDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ViewOrderDetails;
