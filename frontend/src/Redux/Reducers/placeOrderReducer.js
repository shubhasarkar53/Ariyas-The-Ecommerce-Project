/* eslint-disable no-unused-vars */
//place order reducers
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_RESET, PLACE_ORDER_SUCCESS } from "../Constants/placeOrderConstants"
import { CLEAR_ERRORS } from "../Constants/userConstant";

export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
                loading: false,
                success: true
            }
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PLACE_ORDER_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}