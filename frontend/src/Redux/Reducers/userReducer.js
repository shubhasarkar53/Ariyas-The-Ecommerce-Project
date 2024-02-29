import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST} from "../Constants/userConstant";

export const userReducer = (state={user:{}},action) =>{

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,              //why not LOGIN:action.payload.user
                // token:action.payload.token
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }

        case LOAD_USER_FAIL:
            return{                        //why not ...state
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }    
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null 
            };

        default:
            return{
                ...state,
            }
    }
}