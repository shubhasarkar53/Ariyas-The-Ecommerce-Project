/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileSide from "../../../assets/Images/Icons/profile icons/pngwing 3.png";
import pencilIcon from "../../../assets/Images/Icons/createdProductActions/pencil.png";
import deleteIcon from "../../../assets/Images/Icons/createdProductActions/delete.png";
import {
  clearError,
  createProductAction,
  deleteCreatedProduct,
  getYourProducts,
} from "../../../Redux/Actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../../Redux/Constants/productConstants";
import Loader from "../../Loader/Loader";
import "./CreatedProducts.scss";
import DotLoader from "../../Loader/DotLoader";
import Meta from "../../../Meta";
import { Typography } from "@mui/material";
const CreatedProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, products, isDeleted } = useSelector(
    (state) => state.createdProducts
  );

  useEffect(() => {
    dispatch(getYourProducts());

    if (error) {
      // some toast
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      console.log("useeffect:", error);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully", {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(getYourProducts());

      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, isDeleted, error]);

  function handleDeleteProduct(productId) {
    dispatch(deleteCreatedProduct(productId));
  }
  function handleEditProduct(productId) {
    history.push(`/edit-product/${productId}`);
  }

  return (
    <>
      <Meta title="Your Products" />
      {loading ? (
        <DotLoader />
      ) : (
        <>
          <div className="profile-container">
            <ToastContainer />
            <div className="profile-title">
              <Typography variant="h4" className="typoH" align="center">
                Your Products
              </Typography>
            </div>
            <div className="profile-det-container">
              {/* Left side of the profile */}
              <div className="ext-left-profile">
                <img src={profileSide} alt="Background Image" />
              </div>

              {/*Created Products */}
              <div className="created-product-container">
                <div className="created-product-headings">
                  <h3 className="created-product-heading">ProductImage</h3>
                  <h3 className="created-product-heading">ProductId</h3>
                  <h3 className="created-product-heading">Name</h3>
                  <h3 className="created-product-heading">Stock</h3>
                  <h3 className="created-product-heading">Price</h3>
                  <h3 className="created-product-heading">Action</h3>
                </div>
                <div className="created-products">
                  {products.map((product) => {
                    return (
                      <div key={product._id} className="create-product-items">
                        <Link
                          to={`/product/${product._id}`}
                          className="created-product-img"
                        >
                          <img src={`${product.image[0].url}`} alt="image" />
                        </Link>
                        <p>{product._id}</p>
                        <p>{product.name}</p>
                        <p>{product.stock}</p>
                        <p>Rs. {product.price}</p>
                        <div className="create-product-actions">
                          <button
                            className="action-edit"
                            onClick={() => handleEditProduct(product._id)}
                          >
                            <img src={pencilIcon} alt="Edit" />
                          </button>
                          <button
                            className="action-delete"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right side of the profile */}
              <div className="ext-right-profile">
                <img src={profileSide} alt="Background Image" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatedProducts;
