/* eslint-disable no-unused-vars */
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS} from "../Constants/orderConstants"

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
export const listOrdersByUserID = () => async (dispatch, getState) => {
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
export const listAllOrders = () => async (dispatch, getState) => {
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

