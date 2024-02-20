import axios from "axios";

import {ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,CLEAR_ERROR} from "../Constants/productConstants";

export const getProducts = () => async(dispatch) => {
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        const {data} = await axios.get("api/v1/products",{
            headers:{
                "Content-type":"application/json"
            },
            withCredentials:true,
        });
        console.log(data);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// only for clearing error 
export const clearError = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERROR});

}
