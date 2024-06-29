import axios from "axios";

import {
  GET_REQ_SELLER_FAIL,
  GET_REQ_SELLER_REQUEST,
  GET_REQ_SELLER_SUCCESS,
  UPDATE_SELLER_ROLE_FAIL,
  UPDATE_SELLER_ROLE_REQUEST,
  UPDATE_SELLER_ROLE_SUCCESS,
} from "../Constants/sellerConstants";

export const getAllRequestedSellerAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REQ_SELLER_REQUEST });

    const link = `/api/v1/get-req-sellers`;

    const { data } = await axios.get(link);
    // console.log(data);

    dispatch({
      type: GET_REQ_SELLER_SUCCESS,
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: GET_REQ_SELLER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSellerRole = (sellerId, newRole) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SELLER_ROLE_REQUEST });
    const { data } = await axios.put(`api/v1/admin/update/role/${sellerId}`, {
      role: newRole,
    });
    dispatch({ type: UPDATE_SELLER_ROLE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_ROLE_FAIL,
      payload: error.response.data.message,
    });
  }
};
