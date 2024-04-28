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

        <div className="orderDetailsContainer">
          <div className="orderDetailsHeader">
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
          <div className="orderDetailsContainerBox">
            <div className="orderDetailsContainerBoxItems">
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBoxItem">
                <p>
                  <b>Name:</b> {order && order.user && order.user.name}
                </p>
                <p>
                  <b>Phone:</b> {order && order.shippingInfo && order.shippingInfo.phoneNo}
                </p>
                <p>
                  <b>Address:</b>{" "}
                  {order &&
                    order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}
                </p>
              </div>
              <Typography>Payment Info</Typography>
              <div className="orderDetailsContainerBoxItem">
                <p>
                  <b>Amount:</b> ${order && order.totalPrice}
                </p>
              </div>
              <Typography>Order Items</Typography>
              <div className="orderDetailsContainerBoxItem">
                {order && order.orderItems && order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>{item.name}</p>
                    <p>{item.quantity} X ${item.price} = ${item.price * item.quantity}</p>
                  </div>
                ))
                }
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
