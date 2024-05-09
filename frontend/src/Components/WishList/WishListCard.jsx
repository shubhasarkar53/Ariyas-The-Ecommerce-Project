/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import "./WishListCard.scss"
import { Link } from 'react-router-dom'
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ImBoxRemove } from "react-icons/im";

const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
};

const WishListCard = ({ item, deleteWishListItems, moveToCartHandler }) => {

    const truncatedName = truncateText(item.name, 4);

    return (
        <Fragment>

            <div className="cardItem-container"> {/* main container */}

                <div className="card-Item">    {/* item card container */}

                    <img src={item.image} alt={item.name} />

                    <div className="cardItem-details">

                        <Link to={`/product/${item.product}`} className='cardItem-name'>
                            {truncatedName}</Link>
                        <p className='cardItem-price'>Price:<span>{`₹ ${item.price}`}</span></p>

                        <p className='cardItem-remove'

                            onClick={() => deleteWishListItems(item.product)}>Remove
                            {<RiDeleteBin7Fill />}</p>

                        <p className='move-to-cart'
                            onClick={() => moveToCartHandler(item.product)}>Move to Cart
                            {<ImBoxRemove />}</p>

                    </div>
                </div>

                <div className="bar"></div>     {/* bar div */}

            </div>
        </Fragment>
    )
}

WishListCard.propTypes = {
    item: PropTypes.object.isRequired,
    deleteWishListItems: PropTypes.func.isRequired,
    moveToCartHandler: PropTypes.func.isRequired
}

export default WishListCard
