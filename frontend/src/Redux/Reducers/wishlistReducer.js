

/* eslint-disable no-unused-vars */
import { ADD_TO_WISH_LIST, REMOVE_WISH_LIST_ITEM, MOVE_TO_CART } from "../Constants/wishListConstants";



export const wishlistReducer = (state = { wishlistItems: [], cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_WISH_LIST: {
            const item = action.payload;
            const isItemExist = state.wishlistItems.find(
                i => i.product === item.product
            );
            if (isItemExist) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map(i =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                };
            }
        }
        case REMOVE_WISH_LIST_ITEM:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(
                    i => i.product !== action.payload
                ),
            };

        //pending work
        // case MOVE_TO_CART:
        //     {
        //         const item = action.payload;
        //         const isItemExist = state.cartItems.find(i=> i.product === item.product);
        //         if(isItemExist){
        //             return {
        //                 ...state,
        //                 cartItems: state.cartItems.map(i=> 
        //                     i.product === isItemExist.product ? item : i)
        //             }
        //         }else{
        //             return {
        //                 ...state,
        //                 cartItems: [...state.cartItems, item]
        //             }
        //         }
        //     }

        case MOVE_TO_CART: {
            const itemToMove = state.wishlistItems.find(item => item.product === action.payload);
            if (itemToMove) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.filter(item => item.product !== action.payload),
                    cartItems: [...state.cartItems, itemToMove],
                };
            }
            return state;
        }


        default:
            return state;
    }
};