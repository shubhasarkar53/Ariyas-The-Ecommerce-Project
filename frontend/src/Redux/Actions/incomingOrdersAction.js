import axios from "axios";

import { FETCH_INCOMING_ORDER_FAIL, FETCH_INCOMING_ORDER_REQUEST, FETCH_INCOMING_ORDER_SUCCESS, UPDATE_INCOMING_ORDER_STATUS_FAIL, UPDATE_INCOMING_ORDER_STATUS_REQUEST, UPDATE_INCOMING_ORDER_STATUS_SUCCESS } from "../Constants/incomingOrdersConstants"

export const fetchIncomingOrders = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_INCOMING_ORDER_REQUEST })

        const { data } = await axios.get("/api/v1/getallorders/incoming/seller")
        // console.log(data)
        dispatch({ type: FETCH_INCOMING_ORDER_SUCCESS, payload: data.incomingOrders })
    } catch (error) {
        dispatch({ type: FETCH_INCOMING_ORDER_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}

export const updateIncomingOrderStatus = (orderId,newStatus,sellerId) => async (dispatch) =>{
    try {
     
        dispatch({type:UPDATE_INCOMING_ORDER_STATUS_REQUEST});
        console.log(orderId,newStatus,sellerId);
        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/update-order-status/seller/${orderId}`,{sellerId,newStatus},config);
        console.log(data)
        dispatch({type:UPDATE_INCOMING_ORDER_STATUS_SUCCESS, payload:data.success})
    } catch (error) {
        dispatch({ type: UPDATE_INCOMING_ORDER_STATUS_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}