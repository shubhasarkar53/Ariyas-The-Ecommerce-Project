/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Paper, Typography } from "@mui/material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import "./Carousel.scss";
import { Link } from 'react-router-dom';
import Logo from "../../assets/Images/Navbar/logo.png"
import { ThemeProvider, createTheme } from '@mui/material/styles';

// const ImageCarousel = ({ images }) => {
//   if (!images || images.length === 0) {
//     return null; // Render nothing if images are not available
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 2500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     cssEase: "linear",
//     fade: true,
//     lazyLoad: true,
//     arrows: true,
//     dotsClass: "slick-dots",
//     pauseOnDotsHover: true,
//     pauseOnFocus: true,
//   };

//   return (
//     <Slider {...settings}>
//       {images.map((image, index) => (
//         <div key={index} className="carouselImgStyle">
//           <Paper>
//             <img
//               src={image.url}
//               alt={`slide-${index}`}
//               className="carousel-image-div"
//             />
//           </Paper>

//           <div className="caption-div">
//             <img src={Logo} alt="LOGO" style={{ filter: "invert(60)" }} />
//             <Typography className="carousel-title" variant="h3">
//               {image.title}
//             </Typography>
//             <Typography className="carousel-caption" variant="caption">
//               {image.caption}
//             </Typography>
//             <Link to="/shop">
//               <Button
//                 className="carousel-button"
//                 variant="contained"
//               >
//                 Shop Now
//               </Button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// ImageCarousel.propTypes = {
//   images: PropTypes.array.isRequired,
// };

// export default ImageCarousel;



const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return null; // Render nothing if images are not available
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 600000,
    pauseOnHover: true,
    cssEase: 'linear',
    fade: true,
    lazyLoad: true,
    arrows: true,
    dotsClass: 'slick-dots',
    pauseOnDotsHover: true,
    pauseOnFocus: true,
  };


  const getClassByIndex = (index) => {
    switch (index % 3) {
      case 0:
        return 'firstpage';
      case 1:
        return 'secondpage';
      case 2:
        return 'thirdpage';
      default:
        return 'firstpage';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carouselImgStyle">
            <Paper>
              <img
                src={image.url}
                alt={`slide-${index}`}
                className="carousel-image-div"
              />
            </Paper>

            <div className={`caption-div ${getClassByIndex(index)}`}>
              <img src={Logo} alt="LOGO" style={{ filter: 'invert(60)' }} />
              <Typography className="carousel-title" variant="h3">
                {image.title}
              </Typography>
              <Typography className="carousel-caption" variant="caption">
                {image.caption}
              </Typography>
              <Link to="/shop">
                <Button className="carousel-button" variant="contained">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </ThemeProvider>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageCarousel;