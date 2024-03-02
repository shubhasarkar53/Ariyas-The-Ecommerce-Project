/* eslint-disable no-unused-vars */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paper, Typography } from '@mui/material';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import './Carousel.scss'

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return null; // Render nothing if images are not available
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'linear',
    fade: true,
    lazyLoad: true,
    arrows: true,
    dotsClass: 'slick-dots',
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>

                    <Paper>
                      <img
                       src={image.url} 
                       alt={`slide-${index}`} 
                       className='carousel-image-div'
                       />

                       <Typography className='carousel-caption' variant="caption">{image.caption}</Typography>
                          
                    </Paper>
        </div>
      ))}
    </Slider>
  );
  
};

ImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};



export default ImageCarousel;
