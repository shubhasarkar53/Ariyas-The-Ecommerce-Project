/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewOrderDetails.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, clearErrors } from '../../Redux/Actions/orderAction';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import { Typography } from '@mui/material';


const ViewOrderDetails = ( { match }) => {
    const { order, loading, error } = useSelector(state => state.orderDetails);

    const { user } = useSelector(state => state.user);

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
    }, [dispatch, error,match.params.id]);

  return (
  <Fragment>
    {loading ? <Loader /> : (
      <Fragment>
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <div>
              <p className='orderDetailsId'>
                Order #{order && order._id}
              </p>
              <p className="shippingTitle">Shipping Info</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox2">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Items Price:</p>
                  <span>{order.itemsPrice && order.itemsPrice}</span>
                </div>

                <div>
                  <p>Shipping Price:</p>
                  <span>{order.shippingPrice && order.shippingPrice}</span>
                </div>

                <div>
                  <p>Tax:</p>
                  <span> {order.taxPrice && order.taxPrice}</span>
                </div>

                <div>
                  <p>Total Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>

              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </Fragment>
    )}
  </Fragment>
  )
}

ViewOrderDetails.propTypes = {
  match: PropTypes.object.isRequired
}

export default ViewOrderDetails
