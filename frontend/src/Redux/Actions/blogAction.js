/* eslint-disable no-unused-vars */
import axios from "axios";

import {
    ALL_BLOG_REQUEST,
    ALL_BLOG_SUCCESS,
    ALL_BLOG_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,
    CLEAR_ERRORS,
    LOAD_CREATED_BLOG_REQUEST,
    LOAD_CREATED_BLOG_SUCCESS,
    LOAD_CREATED_BLOG_FAIL,
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    CREATE_BLOG_RESET,
    EDIT_BLOG_REQUEST,
    EDIT_BLOG_SUCCESS,
    EDIT_BLOG_FAIL,
    EDIT_BLOG_RESET,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    DELETE_BLOG_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET

} from "../Constants/blogConstants";

//action to get all blogs
export const getBlogs = () => async (dispatch) => {

    try {

        dispatch({ type: ALL_BLOG_REQUEST });

        const { data } = await axios.get("/api/v1/blogs",{
            headers: {
                "Content-type": "application/json",
            },
            withCredentials: true
        });
        console.log(data);
        dispatch({
            type: ALL_BLOG_SUCCESS,
            payload: data
        });

    } catch (error) {

        dispatch({
            type: ALL_BLOG_FAIL,
            payload: error.response.data.message ? 
            error.response.data.message : error.message
        });

    }

}

export const getBlogDetails = (id) => async (dispatch) => {

    try {

        dispatch({ type: BLOG_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/blog/${id}`);

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data.blog
        });

    } catch (error) {

        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response.data.message ? error.response.data.message : error.message
        });

    }

}

export const createBlog = (blogData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    try {
        dispatch({ type: CREATE_BLOG_REQUEST });
        const { data } = await axios.post("/api/v1/blog/new",
            blogData,
            config);
        dispatch({
            type: CREATE_BLOG_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CREATE_BLOG_FAIL,
            payload: error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const editCreatedBlog = (blogId, updateBlogData) => async (dispatch) => {
    dispatch({ type: EDIT_BLOG_REQUEST });

    const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
    };

    try {
        const { data } = await axios.put(`/api/v1/blog/${blogId}`,
            updateBlogData,
            config);
        dispatch({
            type: EDIT_BLOG_SUCCESS,
            payload: data.success
        });

    } catch (error) {

        dispatch({
            type: EDIT_BLOG_FAIL,
            payload: error.response.data.message
        });

    }
};


export const deleteCreatedBlog = (blogId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BLOG_REQUEST });

        const { data } = await axios.delete(`/api/v1/blog/${blogId}`);

        dispatch({
            type: DELETE_BLOG_SUCCESS,
            payload: data.success
        });

    } catch (error) {

        dispatch({
            type: DELETE_BLOG_FAIL,
            payload: error.response.data.message
        });
    }
};

export const getYourBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_CREATED_BLOG_REQUEST });

        const link = `/api/v1/blogs/me`;

        const { data } = await axios.get(link, {
            headers: {
                "Content-type": "application/json",
            },
            withCredentials: true,
        });

        dispatch({
            type: LOAD_CREATED_BLOG_SUCCESS,
            payload: data.sellerAllBlogs, //ALSO WORKS FOR ADMIN
        });
    } catch (error) {
        dispatch({
            type: LOAD_CREATED_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
