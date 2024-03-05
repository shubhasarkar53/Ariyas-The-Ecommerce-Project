/* eslint-disable no-unused-vars */
import React from 'react'
import './Row.scss'
import ProductCard from '../Home/ProductCard'
import PropTypes from 'prop-types';

const ShareeRow = ({ products }) => {
  return (
    <div className="row">
      <h1>{ products && products[8].category} Item&apos;s</h1>
        <div>
        {
            products && products.slice(8,12).map((product)=>{
                return(
                    <ProductCard key={product._id}  product = {product} />
                )
            })
        }
        </div>
    </div>
  )
}

ShareeRow.propTypes = {
  products: PropTypes.array.isRequired
}

export default ShareeRow
