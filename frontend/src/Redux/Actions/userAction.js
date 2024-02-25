import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL} from "../Constants/userConstant";

import axios from "axios";


export const userLogin = (email,password) => async(dispatch) => {
    try{
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{"Content-type":"application/json"},withCredentials:true,};
        const {data} = await axios.post("/api/v1/login",{email,password},config);
        // console.log(data);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const userRegister = (userData) => async(dispatch) => { //distrub
    try{
        dispatch({type:REGISTER_REQUEST});
        const config = {headers:{"Content-type":"application/json"},withCredentials:true,};
        const {data} = await axios.post("/api/v1/register/new",userData,config);
        console.log(data);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user
        })
    }catch(error){
        dispatch({
            type:REGISTER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// only for clearing error 
export const clearError = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERRORS});

}