/* eslint-disable no-unused-vars */
import React from 'react'
import products from "../../assets/Images/Home/product1.png"
import "./ProductCard.scss"

const ProductCard = () => {
  return (
    <div>
        <div className="card">
            <div className='imgContainer'>
                <img src={products} alt="" />
            </div>
            <p>BRASS BALA KRISHNA DANCING 12</p>
            <div className='prices-continer'>
                <span className='price-1'></span>
                <span className='price-2'>$2223</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard