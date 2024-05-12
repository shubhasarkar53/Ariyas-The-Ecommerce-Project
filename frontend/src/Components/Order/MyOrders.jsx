/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./MyOrders.scss";
import Loader from "../Loader/Loader";
import { myOrders } from "../../Redux/Actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const MyOrders = ({ history }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const calculateDeliveryDate = (orderDate, status) => {
    if (status === "delivered") {
      return new Date(orderDate).toDateString();
    } else {
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      return deliveryDate.toDateString();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "red";
      case "shipped":
        return "blue";
      case "delivered":
        return "green";
      default:
        return "black"; // Default color
    }
  };


  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch, history]);

  const isReturnEnabled = (status) => status === "delivered";
  const isCancelVisible = (status) => status !== "delivered";

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orders-container">
            <h1 className="myOrdersHeading">{user.name}&apos;s Orders</h1>
            <div className="myOrdersContainer">
              {orders &&
                orders.reverse().map((order) => (
                  <div className="myOrderItems" key={order._id}>
                    <div className="leftDiv">
                      <h3>Order Date: {order.createdAt.substring(0, 10)}</h3>
                      <h3>Order Items: {order.orderItems.length}</h3>
                      <h3>Amount: ${order.totalPrice}</h3>
                      <h3>Order Status: <span  style={{ color: getStatusColor(order.orderStatus) }}>{order.orderStatus}</span></h3>
                      <h3>
                        Delivery Date:{" "}
                        {calculateDeliveryDate(order.createdAt, order.orderStatus)}
                        {order.orderStatus !== "delivered" && "(approx)"}
                      </h3>
                      <div className="btnSec">
                      <button className="btN" onClick={()=> history.push(`/order/${order._id}`)}>View Order</button>
                      {isCancelVisible(order.orderStatus) && (
                          <button className="btN">Cancel Order</button>
                        )}
                        {isReturnEnabled(order.orderStatus) && (
                          <button className="btN">Return Order</button>
                        )}
                      </div>
                    </div>
                    <div className="rightDiv">
                      <h3>Order Id: <span className="orderID">{order._id}</span></h3>
                      <h3>Payment Method: Cash On Delivery</h3>
                      <h3>
                        Payment Status:{" "}
                        {order.isPaid
                          ? order.paidAt.substring(0, 10)
                          : "Not Paid"}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

MyOrders.propTypes = {
  history: PropTypes.object.isRequired,
};

export default MyOrders;
