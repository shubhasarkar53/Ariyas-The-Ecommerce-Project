/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileSide from "../../../assets/Images/Icons/profile icons/pngwing 3.png";
import {
  clearError,
  createProductAction,
} from "../../../Redux/Actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../../Redux/Constants/productConstants";
import Loader from "../../Loader/Loader";
import "./CreateProduct.scss";

// Icons import

import product1 from "../../../assets/Images/Icons/createProduct/product.png";
import price from "../../../assets/Images/Icons/createProduct/price.png";
import des from "../../../assets/Images/Icons/createProduct/des.png";
import cat from "../../../assets/Images/Icons/createProduct/cat.png";
import stock from "../../../assets/Images/Icons/createProduct/stock.png";
import location from "../../../assets/Images/Icons/createProduct/loc.png";
import Meta from "../../../Meta";
import { Typography } from "@mui/material";
const CreateNewProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, isCreated, error } = useSelector(
    (state) => state.createProduct
  );

  const [productImg, setProductImg] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
    productQuantity: "",
    productLocation: "",
  });

  const {
    productName,
    productPrice,
    productDescription,
    productCategory,
    productQuantity,
    productLocation,
  } = formData;

  function handleChange(e) {
    if (e.target.name === "productImg") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImg(reader.result);
          // console.log(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");

    const myFormData = new FormData();
    myFormData.set("name", productName);
    myFormData.set("price", productPrice);
    myFormData.set("description", productDescription);
    myFormData.set("category", productCategory);
    myFormData.set("stock", productQuantity);
    myFormData.set("category", productCategory);
    myFormData.set("location", productLocation);
    myFormData.set("image", productImg);
    // myFormData.forEach(item => console.log(item))

    dispatch(createProductAction(myFormData));
  }

  useEffect(() => {
    if (error) {
      // some toast
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      console.log("useeffect:", error);
      dispatch(clearError());
    }

    if (isCreated) {
      // some tost upatded successfully
      // dispatch(loadAddress());
      history.push("/admin");
      toast.success("Product Created Successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });

      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, history, isCreated, error]);

  return (
    <>
      <Meta title="Create New Product" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profile-container">
            <ToastContainer />
            <div className="profile-title">
            <Typography variant="h4" className="typoH" align="center">
             Create New Product
            </Typography>
            </div>
            <div className="profile-det-container-restyled">
              {/* Left side of the profile */}
              <div className="ext-left-profile">
                <img src={profileSide} alt="Background Image" />
              </div>

              {/* form to create a new product */}

              <div className="create-product-form-container">
                <h1 className="create-product-form-container-title">
                  Create Product
                </h1>
                <form className="create-product-form" onSubmit={handleSubmit}>
                  <div className="create-product-form-group">
                    <label htmlFor="productName">
                      <img src={product1} alt="" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="Enter product name"
                      name="productName"
                      value={productName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="create-product-form-group">
                    <label htmlFor="productPrice">
                      <img src={price} alt="" />
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      placeholder="Enter product price"
                      value={productPrice}
                      onChange={handleChange}
                      name="productPrice"
                    />
                  </div>
                  <div className="create-product-form-group">
                    <label htmlFor="productDescription">
                      <img src={des} alt="" />
                    </label>

                    <textarea
                      className="form-control"
                      id="productDescription"
                      rows="3"
                      placeholder="Enter product description"
                      value={productDescription}
                      onChange={handleChange}
                      name="productDescription"
                    ></textarea>
                  </div>
                  <div className="create-product-form-group">
                    <label htmlFor="productCategory">
                      <img src={cat} alt="" />
                    </label>
                    <select
                      className="form-control"
                      id="productCategory"
                      value={productCategory}
                      onChange={handleChange}
                      name="productCategory"
                    >
                      <option value="-1">Select category</option>
                      {
                        ["Bags", "Shoes", "Sharees", "Kurttys", "Jewelry", "Wooden", "Ceramic"].map((item, index) => {
                          return (
                            <option key={index} value={`${item}`}>{item}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="create-product-form-group">
                    <label htmlFor="productQuantity">
                      <img src={stock} alt="" />
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="productQuantity"
                      placeholder="Enter product quantity"
                      value={productQuantity}
                      onChange={handleChange}
                      name="productQuantity"
                    />
                  </div>
                  <div className="create-product-form-group">
                    <label htmlFor="productLocation">
                      <img src={location} alt="" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productLocation"
                      placeholder="Enter product location"
                      value={productLocation}
                      onChange={handleChange}
                      name="productLocation"
                    />
                  </div>
                  <label htmlFor="productImg" className="upload-img">Upload a Product Image <span>(*Please Upload Image Less than 500KB)</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    name="productImg"
                    id="productImg"
                    className="choose-avatar"
                    onChange={handleChange}
                  />
                  <button type="submit">Create</button>
                </form>
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

export default CreateNewProduct;
