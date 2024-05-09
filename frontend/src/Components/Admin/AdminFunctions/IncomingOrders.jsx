import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileSide from "../../../assets/Images/Icons/profile icons/pngwing 3.png";
import pencilIcon from "../../../assets/Images/Icons/createdProductActions/pencil.png";
import deleteIcon from "../../../assets/Images/Icons/createdProductActions/delete.png";

import Loader from "../../Loader/Loader";
import "./CreatedProducts.scss";
import DotLoader from "../../Loader/DotLoader";
import { fetchIncomingOrders } from "../../../Redux/Actions/incomingOrdersAction";

const IncomingOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const { user } = useSelector(state => state.auth);
  // const { incomingOrders } = useSelector(state => state.order);

  const { error, incomingOrders, loading } = useSelector(
    (state) => state.incomingOrders
  );
  console.log(incomingOrders)

  useEffect(() => {
    //dispatch icoming order action
    dispatch(fetchIncomingOrders());

    if (error) {
      // some toast
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      console.log("useeffect:", error);
      dispatch(clearError());
    }

    //    if(isDeliverd){
    //     // some code
    //    }
  }, []);

  return (
    <>
      {loading ? (
        <DotLoader />
      ) : (
        <>
          <div className="profile-container">
            <ToastContainer />
            <div className="profile-title">
              <h2>Incoming Orders</h2>
            </div>
            <div className="profile-det-container">
              {/* Left side of the profile */}
              <div className="ext-left-profile">
                <img src={profileSide} alt="Background Image" />
              </div>

              {/*Created Products */}
              <div className="created-product-container">
                <div className="created-product-headings">
                  <h3 className="created-product-heading">OrderId</h3>
                  <h3 className="created-product-heading">Status</h3>
                  <h3 className="created-product-heading">Quantity</h3>
                  <h3 className="created-product-heading">Ammount</h3>
                  <h3 className="created-product-heading">Action</h3>
                </div>
                {/* <div className="created-products">
              {
                    products.map((product)=>{
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
                                  <button  className="action-edit" onClick={ ()=> handleEditProduct(product._id)}>
                                    <img src={pencilIcon} alt="Edit" />
                                  </button>
                                  <button className="action-delete" onClick={()=> handleDeleteProduct(product._id)}>
                                  <img src={deleteIcon} alt="Delete" />
                                  </button>
                                </div>
                            </div>
                        )
                    })
                }
              </div>
                 */}

                <div>
                  <p>Test data goes here</p>
                  {incomingOrders.map((item) => {
                    return (
                      <div key={item._id}>
                        <h2>Order Details</h2>
                        <p>Order ID: {item._id}</p>
                        <p>Order Status: {item.orderStatus}</p>
                        <p>Ordered At: {new Date(item.createdAt).toLocaleString()}</p>
                        <p>Total Price: {item.totalPrice}</p>
                        <p>Payment Method: {item.paymentInfo.id} - {item.paymentInfo.status}</p>
                        <p>Shipping Info:</p>
                        <ul>
                          <li>State: {item.shippingInfo.state}</li>
                          <li>Country: {item.shippingInfo.country}</li>
                          <li>Phone Number: {item.shippingInfo.phoneNo}</li>
                        </ul>
                        <p>Items:</p>
                        <ul>
                          {item.orderItems.map((order, index) => (
                            <li key={index}>
                              <p>Name: {order.name}</p>
                              <p>Quantity: {order.quantity}</p>
                              <p>Price: {order.price}</p>
                            </li>
                          ))}
                        </ul>
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

export default IncomingOrders;
