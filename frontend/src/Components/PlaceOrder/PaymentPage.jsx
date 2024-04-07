//out of service
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import "./paymentPage.scss"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import {placeOrder} from '../../Redux/Actions/placeOrderAction'

const PaymentPage = () => {

    const dispatch = useDispatch();
    // const history = useHistory();

    
  const orderInfo = sessionStorage.getItem('orderInfo') ? JSON.parse(sessionStorage.getItem('orderInfo')) : {};
  const {cartItems, shippingInfo} = orderInfo;
    const [orderDetails, setOrderDetails] = useState({
        orderItems: cartItems,
        shippingInfo,
        paymentMethod: 'Cash on Delivery',
        itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        shippingPrice: orderInfo.shippingCharges,
        taxPrice: orderInfo.tax,
        totalPrice: orderInfo.totalPrice
    });

    const handlePlaceOrder = async () => {
        try {
            // Set payment method as Cash on Delivery
            orderDetails.paymentMethod = 'COD';
            // Set order items from cart items in Redux state
            orderDetails.items = cartItems;
            // Set shipping details from shipping info in Redux state
            orderDetails.shippingInfo = shippingInfo;
            // Call the placeOrder action creator
            const { data } = placeOrder(orderDetails);
            console.log('Order placed successfully:', data);
            dispatch(placeOrder( orderDetails));
            // Handle successful order placement here (e.g., redirect to success page)
            history.push('/order/success')
        } catch (error) {
            console.error('Error placing order:', error);
            // Handle error
        }
    };

    return (
        <div>
            {/* Display order details and payment options */}
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};


PaymentPage.propTypes = {
  history: PropTypes.object
}

export default PaymentPage
