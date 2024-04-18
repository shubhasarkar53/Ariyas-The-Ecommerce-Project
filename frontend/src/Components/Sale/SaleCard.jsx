/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../Redux/Actions/cartAction.js';
import { addItemsToWishList } from '../../Redux/Actions/wishListAction.js';
import { Rating } from '@mui/material';
import wishL from "../../assets/Images/Icons/CartPage/wishL.png";
import cart2 from "../../assets/Images/Icons/CartPage/cart2.png";
import PropTypes from 'prop-types';

const SaleCards = ({ products, isButtonClicked, onButtonClick, product }) => {

  const [loadingButtonId, setLoadingButtonId] = useState(null);
  const [isCardDownVisible, setIsCardDownVisible] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };


  const handleButtonClick = async (buttonId) => {
    // If the button is already loading, prevent additional clicks
    if (loadingButtonId) {
      return;
    }

    setLoadingButtonId(buttonId);

    // It simulates an asynchronous operation (e.g., API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // After the operation, it stops the loading animation and performs other actions
    setLoadingButtonId(null);
    onButtonClick();
  };

  const handleAddToWishlist = (productId, productName) => {
    // Dispatch the addItemsToWishList action with product ID
    dispatch(addItemsToWishList(productId));

    alert(`${productName} is added to wishlist`);

    // Show a success toast
    toast.success(`${productName} added to wishlist!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddToCart = (productId, productName, productPrice) => {
    const product = products.find((product) => product._id === productId);

    // Dispatch the addItemsToCart action with id and quantity
    dispatch(addItemsToCart(productId, 1)); // Assuming you're adding only one item

    alert(`${productName} added to cart`);

    // Show a success toast
    toast.success(`${productName} added to cart!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const options = {
    size: "large",
    value: product ? product.ratings : 0,
    readOnly: true,
    precision: 0.5,
  };



  return (
    <>
      <ToastContainer />
      <div className={`sales-view${isButtonClicked}`}>
        <div className="sale-view-container">
          <div className="sale-division">
            <div id="sale-div-img1">
              <div className="sale-title-div">
                <p>New Customer Offer</p>
                <h2>Get 10% off</h2>
                <button className={`btn-div-sale`} onClick={() => handleButtonClick(1)}>
                  {loadingButtonId === 1 ? 'Loading...' : 'Learn more'}
                </button>
              </div>
            </div>
          </div>
          <div className="sale-division">
            <div id="sale-div-img2">
              <div className="sale-title-div">
                <p>Festive Offer</p>
                <h2>Flat 20% off</h2>
                <button className={`btn-div-sale`} onClick={() => handleButtonClick(2)}>
                  {loadingButtonId === 2 ? 'Loading...' : 'Learn more'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sale-view-offer">

        <div className="sales-card-view">
          <div className="sales-title-section">
            <h1>Sales</h1>
            <p><Link to="/shop" className='sellers-link'>VIEW ALL</Link></p>
          </div>
          <div className="details-container">
            <div className="details">
              {
                products.map((product) => (
                  <div className="sales-card" key={product._id}
                    onMouseEnter={() => setHoveredProductId(product._id)}
                    onMouseLeave={() => setHoveredProductId(null)}>
                    <div className='img-detail'>
                      {product.image && product.image[0] && product.image[0].url && (
                        <Link to={`/product/${product._id}`}>
                          <img src={product.image[0].url} alt={product.name} />
                          {hoveredProductId === product._id && (
                            <div className="icon-container">
                              <Link to="/wishlist">
                                <button onClick={() => handleAddToWishlist(product._id, product.name)}>
                                  {/* Call handleAddToWishlist with product ID and name */}
                                  <FaHeart className="wishlist-icon"
                                  />
                                </button>
                              </Link>
                              <Link to="/cart">
                                <button>
                                  <FaShoppingCart className="cart-icon"
                                    onClick={() =>
                                      handleAddToCart(
                                        product._id,
                                        product.name,
                                        product.price
                                      )
                                    }
                                  />
                                </button>
                              </Link>
                            </div>
                          )}
                        </Link>
                      )}
                    </div>

                    <div className='sales-title'>
                      <h1><Link to={`/product/${product._id}`} className="sale-title-links">{product.name}</Link></h1>
                      <div className='price'>
                        <p>&#x20B9; {product.price}  (<span className="discount-sale">30% off</span>)</p>
                        <p className="price-cut">&#x20B9; 69420</p>
                      </div>
                    </div>

                    <div className='ratings'>
                      <Rating {...options} className='rating-options' />
                      <span className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})
                      </span>
                    </div>

                    {/* {isHovered && (
                      <div className='carddown-div'>
                        <div className='cart'>
                          <img src={cart2} alt='' onClick={addToCartHandler} className='productCard-cart' />
                        </div>
                        <div className='prices-continer'>
                          <span className='price-1'>RS. {product.price}</span>
                          <span className='price-2'>Rs. {product.price * 4}</span>
                        </div>
                        <div className='wishlist'>
                          <img src={wishL} alt='' onClick={addToWishListHandler} className='productCard-wishlist' />
                        </div>
                      </div>
                    )} */}

                    {hoveredProductId === product._id && (
                      <div
                        className={`carddown-div ${isCardDownVisible ? 'visible' : ''}`}
                        onMouseEnter={() => setIsCardDownVisible(true)}
                        onMouseLeave={() => setIsCardDownVisible(false)}
                      >
                        <div className='cart'>
                          <img src={cart2} alt='' onClick={() => handleAddToCart(product._id, product.name, product.price)} className='productCard-cart' />
                        </div>
                        <div className='prices-continer'>
                          <span className='price-1'>RS. {product.price}</span>
                          <span className='price-2'>Rs. {product.price * 4}</span>
                        </div>
                        <div className='wishlist'>
                          <img src={wishL} alt='' onClick={() => handleAddToWishlist(product._id, product.name)} className='productCard-wishlist' />
                        </div>
                      </div>
                    )}

                    {/* {hoveredProductId === product._id && (
                      <div className='carddown-div'>
                        <div className='cart'>
                          <img src={cart2} alt='' onClick={addToCartHandler} className='productCard-cart' />
                        </div>
                        <div className='prices-continer'>
                          <span className='price-1'>RS. {product.price}</span>
                          <span className='price-2'>Rs. {product.price * 4}</span>
                        </div>
                        <div className='wishlist'>
                          <img src={wishL} alt='' onClick={addToWishListHandler} className='productCard-wishlist' />
                        </div>
                      </div>
                    )} */}
                  </div>
                ))

              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

SaleCards.propTypes = {
  products: PropTypes.array.isRequired,
  isButtonClicked: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  product: PropTypes.object, // This is optional since it might not always be present
};

export default SaleCards


// Explanation

// This code is a React component named `SaleCards`. It renders a list of products, typically used for displaying items on sale. Here's a concise explanation:

// 1. **Imports**: Imports necessary modules and components from React, React Router, React Icons, React Toastify, and Redux.

// 2. **Component Definition**: Defines the `SaleCards` component which takes props such as `products`, `isButtonClicked`, `onButtonClick`, and `product`.

// 3. **State**: Utilizes React hooks like `useState` to manage component state, including loading state for buttons and visibility of card details.

// 4. **Event Handlers**: Defines functions to handle button clicks (for learning more about offers, adding to wishlist, and adding to cart).

// 5. **Render Logic**: Renders UI elements including sales offers, product cards with images, titles, prices, ratings, and buttons for wishlist and cart.

// 6. **Toasts**: Utilizes React Toastify for showing success messages upon adding items to wishlist or cart.

// 7. **PropTypes**: Specifies prop types for type-checking during development.

// 8. **Export**: Exports the `SaleCards` component as default.

// Overall, it's a component responsible for rendering sale items with interactive buttons for adding to wishlist or cart, along with handling user interactions and displaying notifications.
