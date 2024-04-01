import {
  ADDRESS_DELETE_FAIL,
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_SUCCESS,
  EDIT_ADDRESS_FAIL,
  EDIT_ADDRESS_REQUEST,
  EDIT_ADDRESS_SUCCESS,
  EDIT_USER_ADDRESS_RESET,
  LOAD_ADDRESS_FAIL,
  LOAD_ADDRESS_REQUEST,
  LOAD_ADDRESS_SUCCESS,
  NEW_ADDRESS_FAIL,
  NEW_ADDRESS_REQUEST,
  NEW_ADDRESS_SUCCESS,
} from "../Constants/addressConstants";
import { CLEAR_ERRORS } from "../Constants/userConstant";

export const addressReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ADDRESS_REQUEST:
    case LOAD_ADDRESS_REQUEST:
    case ADDRESS_DELETE_REQUEST:
    case EDIT_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADDRESS_DELETE_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address._id !== action.payload
        ),
        loading: false,
      };

    case NEW_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        loading: false,
      };

    case EDIT_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          // addresses: state.addresses.map(address => 
          //   address.id === action.payload.id ? action.payload : address
          // ),
          isEdited: action.payload
        };

    case EDIT_USER_ADDRESS_RESET:
            return {
              ...state,
              isEdited:false,
            };

    case LOAD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };
      
    case ADDRESS_DELETE_FAIL:
    case NEW_ADDRESS_FAIL:
    case LOAD_ADDRESS_FAIL:
    case EDIT_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
