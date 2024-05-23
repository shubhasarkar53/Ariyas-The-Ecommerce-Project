import { REGISTER_SELLER_FAIL, REGISTER_SELLER_REQUEST, REGISTER_SELLER_SUCCESS } from "../Constants/registerSellerConstants";


export const registerSellerReducer = (state = {}, action) => {
  switch (action.type) {
      case REGISTER_SELLER_REQUEST:
          return { loading: true };
      case REGISTER_SELLER_SUCCESS:
          return { loading: false, success: true, data: action.payload };
      case REGISTER_SELLER_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};
