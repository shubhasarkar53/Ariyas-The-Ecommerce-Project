/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState, useRef } from "react";
import "./Shop.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearError } from "../../Redux/Actions/productAction";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
import ProductCard from "../Home/ProductCard";
import ProductPagination from "./PaginationComponent/productPagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import NotFound from "../../assets/Images/OtherImages/notofund.png";
import Meta from "../../Meta";

const Shop = ({ match }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const keyword = match.params.keyword;

  const { products, error, loading, productCount, resultPerPage, totalPages } =
    useSelector((state) => state.products);

  const categories = [
    "All",
    "Bags",
    "Shoes",
    "Sharees",
    "Kurttys",
    "Jewelry",
    "Wooden",
    "Ceramic",
  ];

  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [price, setPrice] = useState([0, 30000]); // Price range
  const [category, setCategory] = useState("All"); // Category selected
  const [ratings, setRatings] = useState(0); // Ratings
  const [paginationVisible, setPaginationVisible] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCategoryChange = (categoryItem) => {
    setCategory(categoryItem);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleRatingChange = (e, newRating) => {
    setRatings(newRating);
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    dispatch(
      getProducts(
        keyword,
        currentPage,
        price,
        category === "All" ? "" : category,
        ratings
      )
    );

    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPriceFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPaginationVisible(products.length > 0);
  }, [products]);

  return (
    <Fragment>
      <Meta title="Shop" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="shop-section">
            <button
              className="price-filter-button"
              style={{
                left: showPriceFilter ? "-100px" : "0",
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
              onClick={() => setShowPriceFilter(!showPriceFilter)}
            >
              {showPriceFilter ? "Hide Filter" : "Show Filter"}
            </button>
            <Typography variant="h3" className="typoH" align="center">
              Shop From Your Favourite Categories
            </Typography>

            <div className="products-main-container">
              <div className="products-container">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="not-found-container">
                    <img src={NotFound} className="NotFound" alt="Not Found" />
                    <p className="notfoundText">Products not found</p>
                  </div>
                )}
              </div>
            </div>

            {showPriceFilter && (
              <div ref={containerRef} className="price-filter-container">
                <Typography className="price-header">Price</Typography>
                <Slider
                  className="main-slider"
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={30000}
                />

                <Typography className="category-header">Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((categoryItem) => (
                    <li
                      className="category-link"
                      key={categoryItem}
                      onClick={() => handleCategoryChange(categoryItem)}
                    >
                      {categoryItem}
                    </li>
                  ))}
                </ul>

                <div className="rating-filter">
                  <Typography component="legend" className="rating-header">
                    Ratings
                  </Typography>
                  <Slider
                    className="rating-slider"
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                      dispatch(
                        getProducts(
                          keyword,
                          currentPage,
                          price,
                          "",
                          category === "All" ? "" : category,
                          newRating
                        )
                      );
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </div>
              </div>
            )}

            {paginationVisible && (
              <div className="paginationBox">
                <ProductPagination
                  resultPerPage={resultPerPage}
                  productsCount={productCount}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Shop.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string,
    }),
  }),
};

export default Shop;
