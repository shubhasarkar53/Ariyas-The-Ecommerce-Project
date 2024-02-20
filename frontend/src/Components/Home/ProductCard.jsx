/* eslint-disable no-unused-vars */
import React from 'react'
import "./ProductCard.scss"
import {Link} from 'react-router-dom'
const ProductCard = ({product}) => {
  console.log(product);

  return (
  
    <Link className="card" to={product._id}>
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

export default ProductCard