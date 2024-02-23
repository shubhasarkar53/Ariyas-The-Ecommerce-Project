/* eslint-disable no-unused-vars */
import React from 'react'
import "./ProductCard.scss"
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
const ProductCard = ({ product }) => {
  // console.log(product);

  return (
  
    <Link className="card" to={`/product/${product._id}`}>
            <div className='imgContainer'>
                <img src={product.image[0].url} alt="" />
            </div>
            <p className='product-title'>{product.name}</p>
            {/* <p className='product-des'>{product.description}</p> */}
            <div className='prices-continer'>
                <span className='price-1'>RS. {product.price}</span>
                <span className='price-2'>Rs. 2223</span>
            </div>
    </Link>
  )
}


ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
    // Add more PropTypes as needed for other properties of the product object
  }).isRequired
};

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


export default ProductCard