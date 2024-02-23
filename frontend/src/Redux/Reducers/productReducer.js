/* eslint-disable no-unused-vars */
import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../Constants/productConstants';

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null 
            };
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }

    }

//Explanation 
// This code is a Redux reducer for managing the state of products in a web application. 
// A reducer is a function Redux that determines how the state of the application changes 
//in response to actions dispatched to the store.

// The code defines a single reducer function called productReducer,
// which takes two arguments: `` and action. state argument is the current state of the application, 
// and action is a object that describes an action that has been dispatched to the store.

// The productReducer function uses a switch statement to examine the type property of the action 
//object and return a new state based on the type of action.

// Here are the different cases in the switch statement:

// ALL_PRODUCT_REQUEST: This case is triggered when an action with type ALL_PRODUCT_REQUEST is dispatched. 
//In this case, the reducer returns a new state with a loading property set to true and an empty products array. 
//This indicates that the application is currently loading product data from a server.

// ALL_PRODUCT_SUCCESS: This case is triggered when an action with type ALL_PRODUCT_SUCCESS is dispatched.
// In this case, the reducer returns a new state with a loading property set to false, and the products and
// productsCount properties set to the values in the payload property of the action object. This indicates that 
//the application has successfully loaded the product data from the server.


// ALL_PRODUCT_FAIL: This case is triggered when an action with type ALL_PRODUCT_FAIL is dispatched.
// In this case, the reducer returns a new state with a loading property set to false and an error property 
//set to the value in the payload property of the action object. This indicates that the application has failed 
//to load the product data from the server.


// CLEAR_ERRORS: This case is triggered when an action with type CLEAR_ERRORS is dispatched. In this case, 
//the reducer returns a new state that is identical to the current state, except that the error property is 
//set to null. This indicates that any errors that were previously stored in the state should be cleared.
// default: This case is triggered when none of the other cases match the type property of the action object. 
//In this case, the reducer simply returns the current state.


// Overall, this code defines a reducer that manages the state of products in a web application, including 
//loading, success, and failure states, as well as clearing any errors that may occur.

