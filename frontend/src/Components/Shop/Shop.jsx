/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import "./Shop.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearError } from "../../Redux/Actions/productAction";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
import ProductCard from "../Home/ProductCard";
import ProductPagination from "./PaginationComponent/productPagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Rating } from '@mui/material';



const Shop = ({ match }) => {
  const dispatch = useDispatch();

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

  ]

  /// pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [price, setPrice] = useState([0, 30000]); // Price range
  const [category, setCategory] = useState(""); // Category selected
  const [ratings, setRatings] = useState(0); // Ratings



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    const [minPrice, maxPrice] = newPrice;
    dispatch(getProducts(keyword, currentPage, [minPrice, maxPrice]));
  };


  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, ratings));

    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="shop-section">
            <p className="title">Shop</p>
            <div className="bar"></div>
            {/* <Row products={products}  loading={loading} error={error} /> */}
            <div className="products-container">
              {products &&
                products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
            </div>

            <div className="price-filter-container ">

              {/* Price Filter */}
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

              {/* categori filter */}

              <Typography className="category-header">Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              {/* Ratings Filter */}
              <div className="rating-filter">
                <Typography component="legend" className="rating-header">Ratings</Typography>
                <Slider
                  className="rating-slider"
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </div>


            </div>

            <div className="paginationBox">
              <ProductPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>

          </div>
        </Fragment>
      )}
    </Fragment>
  );
};


Shop.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Shop;


// Explanation

// This code defines a React component called `Shop`, which serves as a page for browsing products. Here's a breakdown:

// 1. **Imports**: Imports necessary modules and components from React, Redux, Material-UI, and local files.

// 2. **Component Definition**: Defines the `Shop` component which takes the `match` prop from React Router.

// 3. **State**: Utilizes React hooks like `useState` to manage component state, including current page, price range, selected category, and ratings filter.

// 4. **Redux**: Uses `useSelector` and `useDispatch` hooks to interact with Redux store, fetching products, handling loading and errors, and dispatching actions.

// 5. **Effect Hook**: Utilizes `useEffect` to fetch products when the component mounts or when dependencies like `keyword`, `currentPage`, `price`, `category`, or `ratings` change.

// 6. **Rendering**: Renders UI elements including product cards, price filter (with a slider), category filter (with a list of categories), and ratings filter (with a slider).

// 7. **Pagination**: Utilizes a custom pagination component (`ProductPagination`) to handle pagination functionality.

// 8. **PropTypes**: Specifies prop types for type-checking during development.

// 9. **Export**: Exports the `Shop` component as default.

// Overall, it's a component responsible for rendering products based on filters like price range, category, and ratings, along with handling pagination and fetching data from the Redux store.