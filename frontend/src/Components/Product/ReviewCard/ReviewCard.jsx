/* eslint-disable no-unused-vars */
import React from 'react'
import { Rating } from '@mui/material'
import './ReviewCard.scss'
import '../ProductDetails/ProductDetails.scss'
import PropTypes from 'prop-types'
const profilePng = "https://www.w3schools.com/howto/img_avatar.png"

const ReviewCard = ({review}) => {

    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };

  return (
    <div className="reviews"> 
    <div className="bar"></div>

           <div className="user">

              <img src={profilePng} alt="User"/>

              <p className='username'>{review.userName}<br/>{review.date}</p>

           </div>

            <div className="rating">
              <Rating {...options} />
            </div>

            <p className="reviewtext">
              {review.comment}
            </p>

    </div>
  )
}


ReviewCard.propTypes = {
  review: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired
  }).isRequired
};

export default ReviewCard
