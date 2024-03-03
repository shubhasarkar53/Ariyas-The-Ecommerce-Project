/* eslint-disable no-unused-vars */
import axios from "axios";

import {ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,} from "../Constants/productConstants";

export const getProducts = (keyword="",currentPage=1,filteredPrice=[0,30000],category,ratings=0) => async(dispatch) => {
    try{

        dispatch({type:ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${filteredPrice[0]}&price[lte]=${filteredPrice[1]}&ratings[gte]=${ratings}`;
        
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${filteredPrice[0]}&price[lte]=${filteredPrice[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await axios.get(link,{
            headers:{
                "Content-type":"application/json"
            },
            withCredentials:true,
        });
        // console.log(data);

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

export const getProductDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log(data);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        });
    } catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const searchProducts = (keyword) => async(dispatch) => {
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        const {data} = await axios.get(`/api/v1/products/search?keyword=${keyword}`);
        // console.log(data);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });
    } catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}
// export const searchProducts = (keyword) => async(dispatch) => {
//     try{
//         dispatch({type:ALL_PRODUCT_REQUEST});
//         const {data} = await axios.get(`/api/v1/products/search?keyword=${keyword}`);
//         console.log(data);
//         dispatch({
//             type:ALL_PRODUCT_SUCCESS,
//             payload:data
//         });
//     } catch(error){
//         dispatch({
//             type:ALL_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// }

export const clearError = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERRORS});

}
