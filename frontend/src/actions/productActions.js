import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

import axios from 'axios'; 

export const getProduct =() => async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        const {data} = await axios.get('/api/v1/products');
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch(
            {
                type:ALL_PRODUCT_FAIL,
                payload:error.response.data.message
            }
        )
    }
}

export const clearErrors = () => async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

//Expalin 
//The first function, getProduct, is an asynchronous function that makes an HTTP GET request to the 
//API endpoint /api/v1/products using the axios library. The function takes in a dispatch argument, which is a function used to send actions to the Redux store.

//When the function is called, it first dispatches an action of type ALL_PRODUCT_REQUEST to indicate
// that a request for product data is being made. Once the data is returned from the API, the function
// dispatches an action of type ALL_PRODUCT_SUCCESS with the payload containing the product data. 
//If there is an error with the request, the function dispatches an action of type ALL_PRODUCT_FAIL 
//with the error message as the payload.

//The second function, clearErrors, is also an asynchronous function that takes in a dispatch argument.
// This function dispatches an action of type CLEAR_ERRORS with no payload. This action is used to clear 
//any error messages that may be stored in the Redux store.

//Overall, these functions are used to manage the state of product data in a Redux store and handle any 
//errors that may occur during the request process.