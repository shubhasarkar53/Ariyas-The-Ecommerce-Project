/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './CartItemCard.scss'
import { Link } from 'react-router-dom'
import { RiDeleteBin7Fill } from "react-icons/ri";
const CartItemCard = ({item, deleteCartItems}) => {
  return (
   <Fragment>
    
       <div className="cardItem-container"> {/* main container */}
    
        <div className="card-Item">    {/* item card container */}
        <img src={item.image} alt={item.name}/>
        <div className="cardItem-details">
            <Link to={`/product/${item.product}`} className='cardItem-name'> {item.name}</Link>
            <p className='cardItem-price'>Price:<span>{`₹ ${item.price}`}</span></p>
            <p className='cardItem-remove' onClick={()=>deleteCartItems(item.product)}>Remove{ <RiDeleteBin7Fill /> }</p>
        </div>
        </div>

        <div className="bar"></div>     {/* bar div */}

       </div>
   </Fragment>
  )
}

CartItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    deleteCartItems: PropTypes.func.isRequired
}

export default CartItemCard
