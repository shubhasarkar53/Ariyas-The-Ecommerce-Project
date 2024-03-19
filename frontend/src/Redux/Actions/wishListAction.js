/* eslint-disable no-unused-vars */
import { ADD_TO_WISH_LIST, REMOVE_WISH_LIST_ITEM,MOVE_TO_CART } from "../Constants/wishListConstants";
import axios from 'axios';

//Add to wish list
export const addItemsToWishList = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_WISH_LIST,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.stock,
        },
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

//Remove item from Wishlist
export const removeItemsFromWishList = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_WISH_LIST_ITEM,
        payload: id,
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

//Move Item From Wishlist To Cart
//pending work
export const moveToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: MOVE_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.stock,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}