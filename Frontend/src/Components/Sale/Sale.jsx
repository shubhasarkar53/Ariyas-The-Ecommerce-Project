/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SaleCards from './SaleCard';
import './SaleStyle.scss';
import { getProducts as listProducts } from '../../Redux/Actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaGifts } from "react-icons/fa6";
import { Link, useHistory } from 'react-router-dom';
import Meta from "../../Meta";

const Sale = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const history = useHistory();
  const [isButtonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleButtonClick = () => {
    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
      history.push('/shop');
    }, 1000);
  };
  return (
    <>
      <div className="sales-container">
        {loading ? (
          <Loader loading={loading} error={error} />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <Meta title="Sale" />
            <div className="sale-container">
              <h1 className="sale-h1" style={{ textDecoration: "underline", color: "#373737", fontSize: "2.1rem", letterSpacing: "0.2rem" }}>SALE</h1>
              <SaleCards products={products} isButtonClicked={isButtonClicked} onButtonClick={handleButtonClick} />
            </div>

            <div className="gift-container">
              <div className="gift-section">
                <div className="gift-title">
                  <div className="gift-icon">
                    <i className="fa-solid fa-bag-shopping"></i>
                  </div>
                  <div className="gift-card-title">
                    <FaGifts className='fagift-icon' />
                    <div className="gift-card-title-div">
                      <h2>Gift Cards: Eco-friendly Gifting</h2>
                      <p>Choose our gift card for a thoughtful, sustainable gift. Perfect for any ocassion</p>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="gift-btn">
                  <button>SHOP GIFT CARD</button>
                </div>
              </div>
            </div>

            <div className="sale-snap">
              <div className="sale-snap-container">
                <h1>Your favorite collection of products are on sale!</h1>
                <p>Grab the best deals and enjoy the moment with the limited edition most enticing swadeshi products presented at your doorsteps. <br />Flat 20% off on traditional footwear and sarees</p>
                <div className="btn-snap-sale">
                  <Link to="/sale"><button>Bags</button></Link>
                  <Link to="/sale"><button>Dress</button></Link>
                  <Link to="/sale"><button>Wooden Items</button></Link>
                  <Link to="/sale"><button>Clay Products</button></Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Sale
