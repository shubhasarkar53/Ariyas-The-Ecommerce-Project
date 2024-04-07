/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const OrderSuccessPage = () => {
  return (
 <Fragment>
     <div className="order-success">
         <h1>Order placed successfully</h1>
         <Link to="/orders/me">Go to Orders</Link>
     </div>
 </Fragment>
  )
}

export default OrderSuccessPage
