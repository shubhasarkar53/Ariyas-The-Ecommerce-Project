import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../Constants/userConstant";

import axios from "axios";

//Login User action
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({
      type: LOGIN_SUCCESS,
      // payload:data.user
      // payload:data
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register user action
export const userRegister = (userData) => async (dispatch) => {
  //distrub
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post("/api/v1/register/new", userData, config);
    // console.log(data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
      // payload:data
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");
    console.log("Load user data", data);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout Action
export const logOut = () => async (dispatch) => {
  try {
    axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// only for clearing error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
