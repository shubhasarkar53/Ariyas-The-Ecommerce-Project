
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./ProductCard.scss"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { RiHeartAddFill } from "react-icons/ri";
import { addItemsToWishList } from '../../Redux/Actions/wishListAction';
import { addItemsToCart } from "../../Redux/Actions/cartAction"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import wishL from "../../assets/Images/Icons/CartPage/wishL.png"
import cart2 from "../../assets/Images/Icons/CartPage/cart2.png"
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
const ProductCard = ({ product, match }) => {

  const dispatch = useDispatch();


  const [isCardDownVisible, setIsCardDownVisible] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);


  const options = {
    size: "large",
    value: product ? product.ratings : 0,
    readOnly: true,
    precision: 0.5,
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };


  // console.log(product);

  // const randomNumber = Math.floor(Math.random() * 5) + 1;

  //function for genarate a random number for span tag in product card
  function getRandomNumber() {

    const randomNumber = Math.random();

    const scaledRandomNumber = randomNumber * 4;

    const finalRandomNumber = Math.floor(scaledRandomNumber) + 2;

    return finalRandomNumber;
  }


  const randomNo = getRandomNumber();


  const addToWishListHandler = () => {
    if (!product._id || !product.name) return;
    dispatch(addItemsToWishList(product._id));
    toast.success(`${product.name} added to wishlist`, {
      // Toast notification
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const addToCartHandler = () => {
    if (!product._id || !product.name || !quantity) return;
    dispatch(addItemsToCart(product._id, quantity));
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (

    <div className="card-container">
      <Link
        className={`card ${isHovered ? 'hovered' : ''}`}
        to={`/product/${product._id}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}>
        <div className="card-layout-container">
          <div className='imgContainer'>
            <img src={product.image[0].url} alt="" />
            {isHovered && (
              <div className="hover-buttons">
                <button className="wishlist-hov-button"
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishListHandler();
                  }}
                >
                  <FaHeart />
                </button>
                <button className='cart-hov-button'
                  onClick={(e) => {
                    e.preventDefault();
                    addToCartHandler();
                  }}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
          </div>
          <div className="product-titles">
            <p className='title'>{product.name}</p>
          </div>
          {/* <p className='product-des'>{product.description}</p> */}

          <div className='prices-container'>
            <span className='price-1'>RS. {product.price}</span>
            <span className='price-2'>Rs. 2223</span>
          </div>
          <div className='ratings'>
            <Rating {...options} className='rating-options' />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})
            </span>
          </div>
          {/* {hoveredProductId === product._id && (
            <div
              className={`carddown-div ${isCardDownVisible ? 'visible' : ''}`}
              onMouseEnter={() => setIsCardDownVisible(true)}
              onMouseLeave={() => setIsCardDownVisible(false)}
            >
              <div className='cart'>
                <img src={cart2} alt='' onClick={() => addToCartHandler(product._id, product.name, product.price)} className='productCard-cart' />
              </div>
              <div className='prices-continer'>
                <span className='price-1'>RS. {product.price}</span>
                <span className='price-2'>Rs. {product.price * 4}</span>
              </div>
              <div className='wishlist'>
                <img src={wishL} alt='' onClick={() => addToWishListHandler(product._id, product.name)} className='productCard-wishlist' />
              </div>
            </div>
          )} */}
          {isHovered && (
            <div className="carddown-div">

              <div className="cart">
                <img src={cart2} alt="" onClick={addToCartHandler} className='productCard-cart' />
              </div>

              <div className='prices-container'>
                <span className='price-1'>RS. {product.price}</span>
                <span className='price-2'>Rs. {product.price * randomNo}</span>
              </div>

              <div className="wishlist">
                <img src={wishL} alt="" onClick={addToWishListHandler} className='productCard-wishlist' />
              </div>

            </div>
          )}
        </div>
      </Link>

    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  match: PropTypes.object,
  products: PropTypes.array
};
export default ProductCard

//Explain--->
// This code defines the propTypes for a React component called ProductCard. propTypes are used to ensure that the component receives the correct type of data as props.

// The ProductCard component expects a single prop called product, which should be an object with the following properties:

// name: This should be a string and is required.
// _id: This should be a string and is required.
// image: This should be an array and is required.
// description: This should be a string and is required.
// price: This should be a number and is required.
// The isRequired property means that the prop is required and will throw a warning if it is not provided.

// By defining propTypes for the ProductCard component, it helps to ensure that the component is used correctly and can prevent bugs caused by passing the wrong type of data as props.




