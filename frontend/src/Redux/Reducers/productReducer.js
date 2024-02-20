import {ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,CLEAR_ERROR} from "../Constants/productConstants"

export const productRedcuer =  (state = {products:[]},action) =>{
    
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return{
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                productCount:action.payload.productCount
            }
        case ALL_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}
