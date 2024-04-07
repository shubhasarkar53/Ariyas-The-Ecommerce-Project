/* eslint-disable no-unused-vars */
//actions for place order
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_RESET, PLACE_ORDER_SUCCESS } from "../Constants/placeOrderConstants"
import axios from 'axios'


export const placeOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config)
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response.data.message,
        })
        console.log( error.response.data.message)
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.put(`/api/v1/pay/order/${orderId}`, paymentResult, config)
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Order Lists
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.get('/api/v1/my/orders', config)
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listOrderDetails = id => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.get(`/api/v1/order/${id}`, config)
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Order Payment Methods
export const listPaymentMethods = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.get('/api/v1/payment/methods', config)
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const addPaymentMethod = method => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/v1/payment/add', method, config)
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}