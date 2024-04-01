/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./ProductCard.scss"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { FiShoppingCart, FiHeart } from "react-icons/fi";
const ProductCard = ({ product }) => {

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

  return (

    <Link
      className={`card ${isHovered ? 'hovered' : ''}`}
      to={`/product/${product._id}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}>
      <div className='imgContainer'>
        <img src={product.image[0].url} alt="" />
        {isHovered && (
          <div className="hover-buttons">
            <button className="wishlist-hov-button">
              <FiHeart />
            </button>
            <Link to="/cart" className="cart-button">
              <FiShoppingCart />
            </Link>
          </div>
        )}
      </div>
      <p className='product-title'>{product.name}</p>
      {/* <p className='product-des'>{product.description}</p> */}

      <div className='ratings'>
        <Rating {...options} />
        <span className="detailsBlock-2-span">
          {" "}
          ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})
        </span>
      </div>

      <div className='prices-continer'>
        <span className='price-1'>RS. {product.price}</span>
        <span className='price-2'>Rs. 2223</span>
      </div>
    </Link>
  )
}


ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })).isRequired,
    ratings: PropTypes.number.isRequired,
    numOfReviews: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
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


