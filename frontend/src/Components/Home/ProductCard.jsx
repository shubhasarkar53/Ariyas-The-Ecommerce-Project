/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
// import { RiHeartAddLine } from "react-icons/ri";
// import { CiShoppingCart } from "react-icons/ci";
import { addItemsToWishList } from "../../Redux/Actions/wishListAction";
import { addItemsToCart } from "../../Redux/Actions/cartAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, match }) => {
  const dispatch = useDispatch();

  // const [isCardDownVisible, setIsCardDownVisible] = useState(false);
  // const [hoveredProductId, setHoveredProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
const nor = product.numberOfReviews;
  const options = {
    size: "large",
    value: product ? product.ratings : 0,
    readOnly: true,
    precision: 0.5,
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  //function for genarate a random number for span tag in product card
  function getRandomNumber() {
    const randomNumber = Math.random();

    const scaledRandomNumber = randomNumber * 4;

    const finalRandomNumber = Math.floor(scaledRandomNumber) + 2;

    return finalRandomNumber;
  }

  const randomNo = getRandomNumber();

  const addToWishListHandler = () => {
    if (!product._id || !product.name) return;
    dispatch(addItemsToWishList(product._id));
    toast.success(`${product.name} added to wishlist`, {
      // Toast notification
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const addToCartHandler = () => {
    if (!product._id || !product.name || !quantity) return;
    dispatch(addItemsToCart(product._id, quantity));
    toast.success(
      `${quantity} ${quantity > 1 ? "items" : "item"} added to cart`,
      {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  return (
    <Fragment>
      <div className="card-container">
        <Link
          className={`card ${isHovered ? "hovered" : ""}`}
          to={`/product/${product._id}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <div className="card-layout-container">
            <div className="imgContainer">
              <img src={product.image[0].url} alt="" />
              {isHovered && (
                <div className="hover-buttons">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishListHandler();
                    }}
                  >
                    <FaHeart className="wishlist-hov-button" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCartHandler();
                    }}
                  >
                    <FaShoppingCart className="cart-hov-button" />
                  </button>
                </div>
              )}
            </div>
            <div className="product-titles">
              <p className="title">{truncateText(product.name, 5)}</p>
            </div>

            <div className="ratings">
              <Rating {...options} className="rating-options" />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews}{nor} {" "}
                {nor > 1 ? "Reviews" : "Review"})
              </span>
            </div>
         
             <div className='prices-container'>
                <span className='price-1'>RS. {product.price}</span>
                <span className='price-2'>Rs. {product.price * randomNo}</span>
              </div>
          </div>
        </Link>
      </div>
      {/* <ToastContainer/> */}
    </Fragment>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  match: PropTypes.object,
  products: PropTypes.array,
};
export default ProductCard;

// //Explain--->
// // This code defines the propTypes for a React component called ProductCard. propTypes are used to ensure that the component receives the correct type of data as props.

// // The ProductCard component expects a single prop called product, which should be an object with the following properties:

// // name: This should be a string and is required.
// // _id: This should be a string and is required.
// // image: This should be an array and is required.
// // description: This should be a string and is required.
// // price: This should be a number and is required.
// // The isRequired property means that the prop is required and will throw a warning if it is not provided.

// // By defining propTypes for the ProductCard component, it helps to ensure that the component is used correctly and can prevent bugs caused by passing the wrong type of data as props.

// import React from 'react';
// import "./ProductCard.scss";

// const ProductCard = () => {
//   return (
//     <div className="product-card">
//       <div className="product-card__image-container">
//         <img src="https://via.placeholder.com/150" alt="Pumpkin Spice Latte" className="product-card__image"/>
//         <button className="product-card__wishlist-button">
//           <span role="img" aria-label="Heart">❤️</span>
//         </button>
//       </div>
//       <div className="product-card__details">
//         <h2 className="product-card__name">Pumpkin Spice Latte</h2>
//         <div className="product-card__tags">
//           <span className="product-card__tag">☕ Espresso</span>
//           <span className="product-card__tag">🥛 Milk</span>
//           <span className="product-card__tag">🎃 Pumpkin Spice</span>
//         </div>
//         <p className="product-card__description">
//           Our signature espresso combined with whole milk, whipped cream, and the beloved flavor of pumpkin spice with our in-house syrup.
//         </p>
//         <div className="product-card__footer">
//           <span className="product-card__price">$10</span>
//           <button className="product-card__add-to-cart-button">Add to cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React, { Fragment, useState } from "react";
// import "./ProductCard.scss";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import PropTypes from "prop-types";
// import { addItemsToWishList } from "../../Redux/Actions/wishListAction";
// import { addItemsToCart } from "../../Redux/Actions/cartAction";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const [isHovered, setIsHovered] = useState(false);

//   const truncateText = (text, limit) => {
//     const words = text.split(" ");
//     if (words.length > limit) {
//       return words.slice(0, limit).join(" ") + "...";
//     }
//     return text;
//   };

//   const options = {
//     size: "large",
//     value: product ? product.ratings : 0,
//     readOnly: true,
//     precision: 0.5,
//   };

//   const handleHover = () => {
//     setIsHovered(!isHovered);
//   };

//   const addToWishListHandler = () => {
//     if (!product._id || !product.name) return;
//     dispatch(addItemsToWishList(product._id));
//     toast.success(`${product.name} added to wishlist`, {
//       position: "bottom-center",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   };

//   const addToCartHandler = () => {
//     if (!product._id || !product.name || !quantity) return;
//     dispatch(addItemsToCart(product._id, quantity));
//     toast.success(
//       `${quantity} ${quantity > 1 ? "items" : "item"} added to cart`,
//       {
//         position: "bottom-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       }
//     );
//   };

//   return (
//     <Fragment>
//       <div className="product-card">
//         <div className="product-card__image-container">
//           <Link to={`/product/${product._id}`}>
//             <img
//               src={product.image[0].url}
//               alt={product.name}
//               className="product-card__image"
//               onMouseEnter={handleHover}
//               onMouseLeave={handleHover}
//             />
//           </Link>
//           <button
//             className="product-card__wishlist-button"
//             onClick={addToWishListHandler}
//           >
//             <FaHeart />
//           </button>
//           <button
//             className="product-card__add-to-cart-button"
//             onClick={addToCartHandler}
//           >
//             <FaShoppingCart />
//           </button>
//         </div>
//         <div className="product-card__details">
//           <h2 className="product-card__name">{truncateText(product.name, 2)}</h2>
//           <div className="product-card__tags">
//             <span className="product-card__tag">Category: {product.category}</span>
//             <span className="product-card__tag">Brand: {product.brand}</span>
//           </div>
//           <div className="product-card__description">
//             <Rating {...options} className="rating-options" />
//             <span className="detailsBlock-2-span">
//               ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})
//             </span>
//           </div>
//           <div className="product-card__footer">
//             <span className="product-card__price">RS. {product.price}</span>
//             <span className="product-card__old-price">RS. {product.price * 2}</span>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </Fragment>
//   );
// };

// ProductCard.propTypes = {
//   product: PropTypes.object.isRequired,
//   match: PropTypes.object,
//   products: PropTypes.array,
// };

// export default ProductCard;







