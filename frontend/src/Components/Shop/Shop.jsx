/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import "./Shop.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearError } from "../../Redux/Actions/productAction";
import Loader from "../Loader/Loader";
import Row from "../Row/Row";
import { keyframes } from "@emotion/react";
import PropTypes from "prop-types";
// import { Pagination } from '@mui/material'
import ProductCard from "../Home/ProductCard";
import ProductPagination from "./productPagination";

const Shop = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  const { products, error, loading, productCount, resultPerPage, totalPages } =
    useSelector((state) => state.products);

  /// pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage));

    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error, keyword, currentPage]);

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
