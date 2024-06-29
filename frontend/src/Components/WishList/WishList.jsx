/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromWishList, moveToCart } from '../../Redux/Actions/wishListAction';
import WishListCard from "./WishListCard";
import "./WishList.scss"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emptyWishList from '../../assets/Images/Icons/CartPage/emptycart.png';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Meta from  "../../Meta";
const WishList = () => {

  const dispatch = useDispatch();

  // Get the cart items from the redux store
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);



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
      theme: "colored",
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
      theme: "colored",
    })
  }

  return (
    <Fragment>
      <Meta title="WishList" />
      {loading ? (
        <Loader />
      ) : (
        <div className="wishlist-main-container">
          <h1>WishList</h1>
          <div className="wishlist-container">
            {wishlistItems.length === 0 ? ( // Conditionally render default layout when wishlist is empty
              <div className="empty-wishlist">
                <p>Your Wishlist is empty</p>
                <img src={emptyWishList} alt="" />
                <Link to="/sale">
                  <button className="add-now-button">Add now</button>
                </Link>
              </div>
            ) : (
              wishlistItems.reverse().map((item) => (
                <WishListCard
                  key={item.product}
                  item={item}
                  deleteWishListItems={removeWishListItemHandler}
                  moveToCartHandler={moveToCartHandler}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* {wishlistItems && wishlistItems.map((item) => (
            <WishListCard
              key={item.product}
              item={item}
              deleteWishListItems={removeWishListItemHandler}
              moveToCartHandler={moveToCartHandler}
            />
          ))} */}
      <ToastContainer />
    </Fragment>
  )
}

export default WishList
