/* eslint-disable no-unused-vars */
import axios from "axios";

import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  LOAD_CREATED_PRODUCT_REQUEST,
  LOAD_CREATED_PRODUCT_SUCCESS,
  LOAD_CREATED_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../Constants/productConstants";

//action to get all products
export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    filteredPrice = [0, 30000],
    category = "",
    location = "",
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link =  `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${filteredPrice[0]}&price[lte]=${filteredPrice[1]}&ratings[gte]=${ratings}`;


      if (category) {
        link += `&category=${category}`;
      }
  
      if (location) {
        link += `&location=${location}`;
      }

      const { data } = await axios.get(link, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(data);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
export const getYourProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CREATED_PRODUCT_REQUEST });

    const link = `/api/v1/products/me`;

    const { data } = await axios.get(link, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    // console.log(data);

    dispatch({
      type: LOAD_CREATED_PRODUCT_SUCCESS,
      payload: data.sellerAllProducts, //ALSO WORKS FOR ADMIN
    });
  } catch (error) {
    dispatch({
      type: LOAD_CREATED_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    // console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const searchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get(
      `/api/v1/products/search?keyword=${keyword}`
    );
    // console.log(data);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProductAction = (productData) => async (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await axios.post(
      "/api/v1/product/new",
      productData,
      config
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editCreatedProduct = (productId, updatedProductData) => async (dispatch) => {
  dispatch({ type: EDIT_PRODUCT_REQUEST });

  try {

    const config = {
      headers: {"Content-Type": "multipart/form-data"},
      withCredentials: true,
    };
    const {data} = await axios.put(`/api/v1/product/${productId}`, updatedProductData,config );

    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: data.success ,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload:error.response.data.message
    });
  }
};


export const deleteCreatedProduct = (productId) => async(dispatch) =>{
  try {
      dispatch({type:DELETE_PRODUCT_REQUEST});

      const {data} = await axios.delete(`/api/v1/product/${productId}`);

      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload:productId,
      });

    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload:error.response.data.message 
      });
    }
};


export const newReview = (reviewData) => async (dispatch) => {
  try {
    
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData,config);

    dispatch({ type: NEW_REVIEW_SUCCESS,
       payload: data.success });

  } catch (error) {

    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


export const getProductswp =
  (
    keyword = "",
    currentPage = 1,
    filteredPrice = [0, 30000],
    category = "",
    location = "",
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link =  `/api/v1/productsall?keyword=${keyword}&page=${currentPage}&price[gte]=${filteredPrice[0]}&price[lte]=${filteredPrice[1]}&ratings[gte]=${ratings}`;


      if (category) {
        link += `&category=${category}`;
      }
  
      if (location) {
        link += `&location=${location}`;
      }

      const { data } = await axios.get(link, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(data);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };