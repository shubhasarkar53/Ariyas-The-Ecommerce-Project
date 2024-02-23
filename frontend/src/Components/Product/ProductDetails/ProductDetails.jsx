/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import {useSelector,useDispatch} from 'react-redux'
import { getProductDetails } from '../../../Redux/Actions/productAction'
import Cod from '../../../assets/Images/Icons/cod.png'
import Fast from '../../../assets/Images/Icons/fast.png'
import Secure from '../../../assets/Images/Icons/secure.png'
import Share from '../../../assets/Images/Icons/share.png'
import PropTypes from 'prop-types';
import { Rating } from '@mui/material'
import './ProductDetails.scss'
import ReviewCard from '../ReviewCard/ReviewCard'
import Loader from '../../Loader/Loader'
import ReviewForm from '../CreateReview/CreateReview'
 
// import ProductShare from './Share'



const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = React.useState(1);
  const [quantity, setQuantity] = React.useState(1);


  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const { product, error, loading } = useSelector((state) => state.productDetails);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  return (
    <Fragment>

      {loading ? (<Loader/>):(
      <Fragment>
      {/*start page wrapper section */}
      <div className="ProductDetailsContainer">
      {/* start of top div section */}
      <div className="top-div">

        <div className="left-div">
          <Carousel autoPlay interval={3000}>
            {product && product.image &&
              product.image.map((item, i) => (
                <img key={item.url} src={item.url} alt={`${i} Slide`}/>
              ))
            }
          </Carousel>
        </div>

        <div className="right-div">
          <div className="name">
            <h1 id='product_name'> {product.name}</h1>
            <img src={Share}  alt=""/>
             {/* <ProductShare/> */}
          </div>

          <div className='ratings'>
          <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})
                </span>
          </div>                  
 
          <div className="price">
            <p>RS. {product.price}</p>
            <p className='available'>
              <b className={product.countInStock < 1 ?  'red' : 'green'}>
                {product.countInStock < 1 ?'UNAVAILABLE': 'AVAILABLE'}
              </b>
            </p>
          </div>

          <div className="buttondiv">
            <button className='buynow'>Buy Now</button>

            <button className='addtocart'>Add to Cart</button>

            <div className='quantity'>
            <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
            </div>

          </div>
          
          <div className="icons">
            <div className="first">
              <img src={Cod} alt=""/>
              <p>Cash on delivery</p>
            </div>
            <div className="second">
              <img src={Fast} alt=""/>
              <p>Fast Delivery</p>
            </div>
            <div className="third">
              <img src={Secure} alt=""/>
              <p>Secure Payment</p>
            </div>
          </div>
        </div>
      </div>
      {/* end of top div section */}

      {/* start of down div section */}
      <div className="downdiv">

        <div className="description">
          Description:<p> {product.description}</p>
        </div>

        <div className="reviews">
          <h2>Reviews</h2>

          {product.reviews && product.reviews[0] ? (
            <div className="review">
              {product.reviews && product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review}/> // Add a unique "key" prop to the ReviewCard component
              ))}
            </div>
          ) : (
            <p className='noreview'>No Reviews Yet</p>
          )}
         
         <ReviewForm/>

        </div>

      </div>
      {/* end of down div section */}
      </div>
      {/*end page wrapper section */}
    </Fragment>)}

    </Fragment>
  );
};

ProductDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

// export default ProductDetails;

export default ProductDetails
