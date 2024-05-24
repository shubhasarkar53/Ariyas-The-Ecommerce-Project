import axios from 'axios';
import { REGISTER_SELLER_FAIL, REGISTER_SELLER_REQUEST, REGISTER_SELLER_SUCCESS } from '../Constants/registerSellerConstants';

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
            payload: data
        });
    } catch (error) {
        dispatch({
            type: REGISTER_SELLER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
