/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Actions/productAction";
import Row from "../Row/Row";
import Loader from "../Loader/Loader";
import ImageCarousel from "../Carousel/Carousel";

//import images for carousel
import img from "../../assets/Images/Carousel/AdobeStock_219379270_Preview.jpeg";
import image2 from "../../assets/Images/Carousel/AdobeStock_326340898_Preview.jpeg";
import image3 from "../../assets/Images/Carousel/AdobeStock_596562754_Preview.jpeg";
import image4 from "../../assets/Images/Carousel/AdobeStock_655646740_Preview.jpeg";


//import other images
import Logo from '../../assets/Images/Home/all_logo.png'
const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const images = [
    { url: img, title: "Ariyas - Discover Local Treasures" ,caption: "Products With GI Tag's",link:"/" },
    { url: image2, title: "Ariyas - Discover Local Treasures" ,caption: "Buy & Sell Local Goods",link:"/" },
    { url: image3, title: "Ariyas - Discover Local Treasures" , caption: "Empower Local Artician's",link:"/" },
    { url: image4, title: "Ariyas - Discover Local Treasures" , caption: "Start Your Journey Today",link:"/" },
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">

          <div className="carousel-container">
            <ImageCarousel images={images} />
            
          </div>

          <div className="logo-container"> <img src={Logo} alt="logo" /></div>

          <div className="category-container">
            <div className="top-container">

              <div className="top1">
                <p className="top1-text">HandMade Bag&apos;s</p>
                <button className="top1-button">Bags</button>
              </div>

              <div className="top2">
                <p className="top2-text">Hand-Loom Sharee&apos;s</p>
                <button className="top2-button">Sharees</button>
              </div>

            </div>

            <div className="bottom-container">

              <div className="bottom1">
                <p className="bottom1-text">Woodcrafted Item&apos;s</p>
                <button className="bottom1-button">Woodcrafts</button>
              </div>

              <div className="bottom2">
                <p className="bottom2-text">Clay-Made Item&apos;s</p>
                <button className="bottom2-button">Clay-Made</button>
              </div>

            </div>
          </div>

          <div className="product-row-container">
            <Row products={products} loading={loading} error={error} />
            <Row products={products} loading={loading} error={error} />
            <Row products={products} loading={loading} error={error} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
