import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileSide from "../../../assets/Images/Icons/profile icons/pngwing 3.png";
import pencilIcon from "../../../assets/Images/Icons/createdProductActions/pencil.png";
import deleteIcon from "../../../assets/Images/Icons/createdProductActions/delete.png";
import { clearError, createProductAction, getYourProducts } from "../../../Redux/Actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../../Redux/Constants/productConstants";
import Loader from "../../Loader/Loader";
import "./CreatedProducts.scss"
const CreatedProducts = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {loading,error,products} = useSelector(state=>state.createdProducts);

    useEffect(()=>{
        dispatch(getYourProducts());
    },[])

    return (
        <>
        {
          loading? <Loader /> :
          (
            <>
          <div className="profile-container">
          <ToastContainer />
            <div className="profile-title">
              <h2>Your Products</h2>
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
                  {
                        products.map((product)=>{
                          console.log(product)
                            return(
                                <div key={product._id} className="create-product-items">
                                    <div className="created-product-img">
                                    <img src={`${product.image[0].url}`} alt="image" />
                                    </div>
                                    <p >{product._id}</p>
                                    <p>{product.name}</p>
                                    <p>{product.stock}</p>
                                    <p>Rs. {product.price}</p>
                                    <div className="create-product-actions">
                                      <div className="action-edit">
                                        <img src={pencilIcon} alt="Edit" />
                                      </div>
                                      <div className="action-delete">
                                      <img src={deleteIcon} alt="Delete" />
                                      </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                  </div>
                    
                </div>

    
              {/* Right side of the profile */}
              <div className="ext-right-profile">
                <img src={profileSide} alt="Background Image" />
              </div>
            </div>
          </div>
        </>
          )
        }
        </>
      );
}

export default CreatedProducts