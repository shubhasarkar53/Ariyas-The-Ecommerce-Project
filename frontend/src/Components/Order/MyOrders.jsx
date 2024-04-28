/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import PropTypes from "prop-types"
import "./MyOrders.scss"
import Loader from '../Loader/Loader'
import { myOrders} from '../../Redux/Actions/orderAction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
const MyOrders = ({history}) => {
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.user);
    const { loading, error, orders } = useSelector((state) => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
    }, [ dispatch,history]);
  return (
    <Fragment>
      {
        loading ? (<Loader />) : (
          <Fragment>
            <div className="orders-container">
            <h1 className="myOrdersHeading">{user.name}&apos;s Orders</h1>
            <div className="myOrdersContainer">
              {orders && orders.map((order) => (
                <div className="myOrderItems" key={order._id}>
                  <h3>Order Id: {order._id}</h3>
                  <h3>Order Date: {order.createdAt.substring(0, 10)}</h3>
                  <h3>Order Items: {order.orderItems.length}</h3>
                  <h3>Amount: ${order.totalPrice}</h3>
                  <h3>Order Status: {order.orderStatus}</h3>
                  <h3>Payment Method: {order.paymentMethod}</h3>
                  <h3>Payment Status: {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}</h3>
                  <button className="viewOrderBtn" onClick={()=> history.push(`/order/${order._id}`)}>View Order</button>
                  </div>
              ))}
            </div>
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

MyOrders.propTypes = {
  history: PropTypes.object.isRequired,
};

export default MyOrders
