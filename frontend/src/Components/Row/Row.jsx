/* eslint-disable no-unused-vars */
import React from 'react'
import './Row.scss'
import ProductCard from '../Home/ProductCard'
const Row = ({products}) => {
  return (
    <div className="row">
      <h1>Title</h1>
        <div>
        {
            products && products.map((product)=>{
                return(
                    <ProductCard key={product._id}  product = {product} />
                )
            })
        }
        </div>
    </div>
  )
}

export default Row
