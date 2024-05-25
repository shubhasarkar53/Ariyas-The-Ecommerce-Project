
import { CLEAR_ERRORS } from "../Constants/registerSellerConstants";
import { GET_REQ_SELLER_FAIL, GET_REQ_SELLER_REQUEST, GET_REQ_SELLER_SUCCESS, UPDATE_SELLER_ROLE_FAIL, UPDATE_SELLER_ROLE_REQUEST, UPDATE_SELLER_ROLE_RESET, UPDATE_SELLER_ROLE_SUCCESS } from "../Constants/sellerConstants";

export const requestedSellerReducer = (state = { sellers: [] }, action) => {
    switch (action.type) {
      case GET_REQ_SELLER_REQUEST:
      case UPDATE_SELLER_ROLE_REQUEST:
        return {
            ...state,
          loading: true,
          sellers: [],
        };
      case GET_REQ_SELLER_SUCCESS:
        return {
          loading: false,
          sellers: action.payload,
        };
        case UPDATE_SELLER_ROLE_SUCCESS:
          return{
            loading: false,
            isEdited: action.payload,
            message:"Role Updated Successfully."
          }
      case GET_REQ_SELLER_FAIL:
    case UPDATE_SELLER_ROLE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
    case UPDATE_SELLER_ROLE_RESET:
            return {
              ...state,
              isEdited: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

