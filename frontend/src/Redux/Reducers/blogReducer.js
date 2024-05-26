/* eslint-disable no-unused-vars */
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

export const blogReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
      case ALL_BLOG_REQUEST :
        return {
          loading: true,
          blogs: [],
        };
      case ALL_BLOG_SUCCESS:
        return {
          loading: false,
          blogs: action.payload.blogs,
          blogsCount: action.payload.blogsCount,
        };
      case ALL_BLOG_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


  export const blogDetailsReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
      case BLOG_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case BLOG_DETAILS_SUCCESS:
        return {
          loading: false,
          blog: action.payload,
        };
      case BLOG_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }


  export const createBlogReducer = (state = {blogs:[]}, action) => {
    switch (action.type) {
      case CREATE_BLOG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_BLOG_SUCCESS:
        return {
          loading: false,
          isCreated: action.payload.success,
          blog: [...state.blogs, action.payload.blogs],
        };
      case CREATE_BLOG_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CREATE_BLOG_RESET:
        return {
          ...state,
          isCreated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }

  export const loadCreatedBlogReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
      case EDIT_BLOG_REQUEST:
      case DELETE_BLOG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOAD_CREATED_BLOG_REQUEST:
        return {
          loading: true,
          blogs: [],
        };
      case LOAD_CREATED_BLOG_SUCCESS:
        return {
          loading: false,
          blogs: action.payload,
        };
      case EDIT_BLOG_SUCCESS:
          return{
            loading: false,
            isEdited: action.payload,
          }
      case DELETE_BLOG_SUCCESS:
        return {
          ...state,
          blogs: state.blogs.filter(
            (blog) => blog._id !== action.payload
          ),
          isDeleted: true,
          loading: false,
        };
      case LOAD_CREATED_BLOG_FAIL:
      case EDIT_BLOG_FAIL:
      case DELETE_BLOG_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case DELETE_BLOG_RESET: {
        return {
          ...state,
          isDeleted: false,
        };
      }
      case EDIT_BLOG_RESET:{
        return {
          ...state,
          isEdited: false,
        };
      }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


  export const createReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
