import axios from "axios";

import { FETCH_INCOMING_ORDER_FAIL, FETCH_INCOMING_ORDER_REQUEST, FETCH_INCOMING_ORDER_SUCCESS } from "../Constants/incomingOrdersConstants"

export const fetchIncomingOrders = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_INCOMING_ORDER_REQUEST })

        const { data } = await axios.get("/api/v1/getallorders/incoming/seller")
        console.log(data)
        dispatch({ type: FETCH_INCOMING_ORDER_SUCCESS, payload: data.incomingOrders })
    } catch (error) {
        dispatch({ type: FETCH_INCOMING_ORDER_FAIL, 
            payload: error.response.data.message ?
            error.response.data.message 
            : error.message})
    }
}
