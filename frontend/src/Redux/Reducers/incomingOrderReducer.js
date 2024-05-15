import { FETCH_INCOMING_ORDER_FAIL, FETCH_INCOMING_ORDER_REQUEST, FETCH_INCOMING_ORDER_SUCCESS, UPDATE_INCOMING_ORDER_STATUS_FAIL, UPDATE_INCOMING_ORDER_STATUS_REQUEST, UPDATE_INCOMING_ORDER_STATUS_RESET, UPDATE_INCOMING_ORDER_STATUS_SUCCESS } from "../Constants/incomingOrdersConstants";
import { CLEAR_ERRORS } from "../Constants/orderConstants";

  
  const initialState = {
    loading: false,
    incomingOrders: [],
    error: null
  };
  
  const incomingOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INCOMING_ORDER_REQUEST:
      case UPDATE_INCOMING_ORDER_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_INCOMING_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          incomingOrders: action.payload,
          error: null
        };
      case UPDATE_INCOMING_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          message:"Order status Updated Successfully.",
          isUpdated: action.payload,
          error: null
        };
      case FETCH_INCOMING_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case UPDATE_INCOMING_ORDER_STATUS_FAIL:
        return {
          ...state,
          loading: false,
          isUpdated:false,
          error: action.payload
        };

        case UPDATE_INCOMING_ORDER_STATUS_RESET:
            return {
              ...state,
              isUpdated:false,
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
      default:
        return state;
    }
  };
  
  export default incomingOrdersReducer;
  