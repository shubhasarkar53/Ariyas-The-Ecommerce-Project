/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './CartItemCard.scss'
import { Link } from 'react-router-dom'
const CartItemCard = ({item, deleteCartItems}) => {
  return (
   <Fragment>
       <div className="cardItem">
        <img src={item.image} alt={item.name}/>
        <div className="cardItem-details">
            <Link to={`/product/${item.product}`}> {item.name}</Link>
            <span>{`Price: ₹ ${item.price}`}</span>
            <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
        </div>
       </div>
   </Fragment>
  )
}

CartItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    deleteCartItems: PropTypes.func.isRequired
}

export default CartItemCard
