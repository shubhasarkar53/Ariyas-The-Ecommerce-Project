/* eslint-disable no-unused-vars */
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS,
    MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST,
     ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST,
} from "../Constants/orderConstants"

import axios from "axios"


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post("/api/v1/order/new", order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload:data })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

// Get Orders by user ID
export const listOrdersByUserID = () => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const { data } = await axios.get("/api/v1/orders/me")
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}

// Get All Orders 
export const listAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const { data } = await axios.get("/api/v1/orders")
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}



//my orders
export const myOrders =() => async(dispatch)=>{
    try {
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get("/api/v1/orders/me");
        console.log(data.orders);
        dispatch({ type: MY_ORDERS_SUCCESS, payload:data.orders })
    } catch (error) {
        dispatch({ type: MY_ORDERS_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
             ? error.response.data.message : error.message,
        })
    }
}