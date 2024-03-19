/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import {useSelector,useDispatch} from "react-redux";
import { removeItemsFromWishList, moveToCart } from '../../Redux/Actions/wishListAction';
import  WishListCard  from "./WishListCard";
import "./WishList.scss"
import { toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const WishList = () => {

  const dispatch = useDispatch();
  
  // Get the cart items from the redux store
  const { wishlistItems } = useSelector((state) => state.wishlist);


  // remove the wishlist items function
  const removeWishListItemHandler = (id) => {
    dispatch(removeItemsFromWishList(id));
    toast.success("Item removed from wishlist", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"colored",
  })
  }

  // move the wishlist items to cart
  const moveToCartHandler = (id) => {
    dispatch(moveToCart(id));
    toast.success("Item moved to cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"colored",
  })
  }
 
  return (
  <Fragment>
    <div className="wishlist-main-container">
      <h1>WishList</h1>
      <div className="wishlist-container">
        {wishlistItems && wishlistItems.map((item) => (
          <WishListCard
            key={item.product}
            item={item}
            deleteWishListItems={removeWishListItemHandler}
            moveToCartHandler={moveToCartHandler}
          />
        ))}
      </div>
    </div>
    <ToastContainer/>
  </Fragment>
  )
}

export default WishList
