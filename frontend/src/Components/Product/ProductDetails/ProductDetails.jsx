/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails, newReview } from "../../../Redux/Actions/productAction";
import Cod from "../../../assets/Images/Icons/cod.png";
import Fast from "../../../assets/Images/Icons/fast.png";
import Secure from "../../../assets/Images/Icons/secure.png";
import ShareIcon from "../../../assets/Images/Icons/share.png";
import Wish from "../../../assets/Images/Icons/profile icons/wishlist.png";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import "./ProductDetails.scss";
import ReviewCard from "../ReviewCard/ReviewCard";
import Loader from "../../Loader/Loader";
import { addItemsToCart } from "../../../Redux/Actions/cartAction";
import { addItemsToWishList } from "../../../Redux/Actions/wishListAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../../Redux/Constants/productConstants";
import axios from "axios";
import Meta from "../../../Meta";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();

  // Define states
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [shareVisible, setShareVisible] = useState(false);

  // Get the product details from Redux
  const { product, error, loading } = useSelector((state) => state.productDetails);
  const seller = product.user;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/me/${seller}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [seller]);

  // Get the review details from Redux
  const { error: reviewError, success } = useSelector((state) => state.createReview);

  const options = {
    size: "large",
    value: product ? product.ratings : 0,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error("Cannot add more items. Insufficient stock.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      toast.error("Minimum quantity reached. Cannot decrease further.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (!product.name || !quantity) return;
    dispatch(addItemsToCart(match.params.id, quantity));
    toast.success(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart`, {
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const addToWishListHandler = () => {
    if (!product.name) return;
    dispatch(addItemsToWishList(match.params.id));
    toast.success(`${product.name} added to wishlist`, {
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

  const buyNowHandler = () => {
    if (!product.name || !quantity) return;
    dispatch(addItemsToCart(match.params.id, quantity));
    toast.success(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    history.push("/cart");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearError());
    }

    if (reviewError) {
      toast.error(reviewError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearError());
    }

    if (success) {
      toast.success("Review submitted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, reviewError, success]);

  const productUrl = `${window.location.origin}/product/${match.params.id}`;
  const productDetails = `Check out this product: ${product.name}\nPrice: ${product.price}\n${productUrl}`;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Meta title={`${product.name} -- Ariyas`} />
          <div className="ProductDetailsContainer">
            <div className="top-div">
              <div className="left-div">
                <Carousel autoPlay interval={3000}>
                  {product && product.image && product.image.map((item, i) => (
                    <img key={item.url} src={item.url} alt={`${i} Slide`} />
                  ))}
                </Carousel>
              </div>

              <div className="right-div">
                <div className="name">
                  <h1 id="product_name"> {product.name}({product.location})</h1>
                  <div
                    className="share-container"
                    onMouseEnter={() => setShareVisible(true)}
                    onMouseLeave={() => setShareVisible(false)}
                    onClick={() => setShareVisible(!shareVisible)}
                  >
                    <img src={ShareIcon} alt="Share" className="share-icon" />
                    {shareVisible && (
                      <div className="share-buttons">
                        <FacebookShareButton url={productUrl} quote={productDetails}>
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={productUrl} title={productDetails}>
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={productUrl} title={productDetails}>
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <CopyToClipboard text={productDetails}>
                          <IconButton onClick={() => toast.success("Product details copied to clipboard!")}>
                            <img src={ShareIcon} alt="Copy to clipboard" />
                          </IconButton>
                        </CopyToClipboard>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ratings">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span"> ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})</span>
                </div>

                <div className="price">
                  <p>RS. {product.price}</p>
                  <p className="available">
                    <b className={product.countInStock < 1 ? "red" : "green"}>
                      {product.countInStock < 1 ? "UNAVAILABLE" : "AVAILABLE"}
                    </b>
                  </p>
                </div>

                <div className="buttondiv">
                  <button disabled={product.countInStock < 1} className="buynow" onClick={buyNowHandler}>Buy Now</button>
                  <button disabled={product.countInStock < 1} className="addtocart" onClick={addToCartHandler}>Add to Cart</button>

                  <div className="horizontal-quantity-wishlist">
                    <div className="quantity">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <div className="wishlist">
                      <img onClick={addToWishListHandler} src={Wish} alt="" />
                    </div>
                  </div>
                </div>

                <div className="icons">
                  <div className="first">
                    <img src={Cod} alt="" />
                    <p>Cash on delivery</p>
                  </div>
                  <div className="second">
                    <img src={Fast} alt="" />
                    <p>Fast Delivery</p>
                  </div>
                  <div className="third">
                    <img src={Secure} alt="" />
                    <p>Secure Payment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="downdiv">
              <div className="description">
                <p>Description:<span> {product.description}</span></p>
                <p>Seller:<span>{seller}</span></p>
                <p>Location:<span>{product.location}</span></p>
              </div>

              <div className="reviews">
                <h2>Reviews</h2>

                <div className="createReviewContainer">
                  <Box>
                    <Button variant="contained" onClick={handleOpen} className="review-button">Leave a Review</Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle className="reviews-comment">Leave a Review</DialogTitle>
                      <DialogContent>
                        <Box>
                          <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)} />
                        </Box>
                        <TextField
                          multiline
                          rows={4}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          label="Your Review"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </div>

                {product.reviews && product.reviews[0] ? (
                  <div className="review">
                    {product.reviews && product.reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="noreview">No Reviews Yet</p>
                )}
              </div>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
