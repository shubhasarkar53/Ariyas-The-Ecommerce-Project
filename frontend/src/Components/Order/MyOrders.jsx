/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./MyOrders.scss";
import Loader from "../Loader/Loader";
import { myOrders } from "../../Redux/Actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Meta from "../../Meta";
const MyOrders = ({ history }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  
  const [returnWindowOpen, setReturnWindowOpen] = useState(true);

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


  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate if return window is closed after 7 days of delivery
      orders.forEach(order => {
        if (order.orderStatus === "delivered") {
          const deliveryDate = new Date(order.createdAt);
          deliveryDate.setDate(deliveryDate.getDate() + 7);
          const currentDate = new Date();
          if (currentDate > deliveryDate) {
            setReturnWindowOpen(false);
          }
        }
      });
    }, 1000 * 60 * 60 * 24); // Check every day
    return () => clearInterval(interval);
  }, [orders]);


  const isReturnEnabled = (status) => status === "delivered" && returnWindowOpen;
  const isCancelVisible = (status) => status !== "delivered";

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Meta title={`${user && user.name}-Order's`}/>
          <div className="orders-container">
            <h1 className="myOrdersHeading">{user.name}&apos;s Orders</h1>
            <div className="myOrdersContainer">
              {orders &&
                orders.reverse().map((order) => (
                  <div className="myOrderItems" key={order._id}>
                    <div className="leftDiv">
                      <h3>Order Date: <span>{order.createdAt.substring(0, 10)}</span></h3>
                      <h3>Order Items: <span>{order.orderItems.length}</span></h3>
                      <h3>Amount: <span>${order.totalPrice}</span></h3>
                      <h3>Order Status: <span style={{ color: getStatusColor(order.orderStatus) }}>{order.orderStatus}</span></h3>
                      <h3>
                        Delivery Date:{" "}
                        <span>
                          {calculateDeliveryDate(order.createdAt, order.orderStatus)}
                          {order.orderStatus !== "delivered" && "(approx)"}
                        </span>
                      </h3>
                      <div className="btnSec">
                        <button className="btN" onClick={() => history.push(`/order/${order._id}`)}>View Order</button>
                        {isCancelVisible(order.orderStatus) && (
                          <button className="btN">Cancel Order</button>
                        )}
                        {isReturnEnabled(order.orderStatus) && (
                          <button className="btN">Return Order</button>
                        )}
                         {!returnWindowOpen && (
                          <span style={{ color: "red", marginLeft: "10px" }}>
                            Return window closed after 7 days
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="rightDiv">
                      <h3>Order Id: <span className="orderID">{order._id}</span></h3>
                      <h3>Payment Method: <span>Cash On Delivery</span></h3>
                      <h3>
                        Payment Status:{" "}
                        <span>
                          {/* {order.isPaid
                            ? order.paidAt.substring(0, 10)
                            : "Not Paid"} */}
                            {/* make the payment status paid after the order status will be delivered  */}
                            {order.orderStatus === "delivered" ? "Paid" : "Not Paid"}
                        </span>

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
