import axios from 'axios';
import { CLEAR_ERRORS, REGISTER_SELLER_FAIL, REGISTER_SELLER_REQUEST, REGISTER_SELLER_SUCCESS } from '../Constants/registerSellerConstants';

export const registerSeller = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_SELLER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.post('/api/v1/register-seller', formData, config);

        dispatch({
            type: REGISTER_SELLER_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: REGISTER_SELLER_FAIL,
            payload: error.response.data.message
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };