/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
import { fetchIncomingOrders, updateIncomingOrderStatus } from "../../../Redux/Actions/incomingOrdersAction";
import "./IncomingOrders.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { UPDATE_INCOMING_ORDER_STATUS_REQUEST, UPDATE_INCOMING_ORDER_STATUS_RESET } from "../../../Redux/Constants/incomingOrdersConstants";
import Meta from "../../../Meta";
import { Typography } from "@mui/material";



const IncomingOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  // const { incomingOrders } = useSelector(state => state.order);

  const { error, incomingOrders, loading, isUpdated } = useSelector(
    (state) => state.incomingOrders
  );

  console.log("orders", incomingOrders);


  const incomingOrdersForSeller = incomingOrders.map((orders) => ({
    ...orders,
    orderItems: orders.orderItems.filter((item) => item.seller === user._id),
    totalOrderAmmountOfSeller: orders.orderItems
      .filter((item) => item.seller === user._id)
      .reduce((prev, curr) => prev + curr.quantity * curr.price, 0),
    currentSellerStatus: orders.sellerStatus.filter((item) => item.seller === user._id)
  }));
  console.log("incomingOrdersForSeller:", incomingOrdersForSeller);




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


    if (isUpdated) {
      // some tost upatded successfully
      toast.success("Order Status Updated Successfully", {
        position: "bottom-center",
        autoClose: 3000,
      });
      //   console.log("upatded successfully");
      // history.push("/profile");

      dispatch({ type: UPDATE_INCOMING_ORDER_STATUS_RESET });
      //   console.log("UPDATE_USER_PASSWORD_RESET");
    }

    //    if(isDeliverd){
    //     // some code
    //    }
  }, [dispatch, error, isUpdated]); //////////////orderStatusMap





  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };



  const [orderStatusMap, setOrderStatusMap] = useState({});


  function handleStatusChange(productId, newStatus) {
    setOrderStatusMap(prevState => (
      {
        ...prevState,
        [productId]: newStatus
      }
    ))
  };



  function submitStatusHandler(orderId, productId) {
    console.log("clicked")
    // console.log("orderStatus:",orderStatus);
    // console.log(orderStatusMap);
    console.log(orderId, orderStatusMap[productId], user._id);
    // updateSellerOrderStatus acton dispatch()
    dispatch(updateIncomingOrderStatus(orderId, orderStatusMap[productId], user._id)); //orderid , newStatus, sellerId

  }




  return (
    <>
      <Meta title="Incoming Orders" />
      {loading ? (
        <DotLoader />
      ) : (
        <>
          <div className="profile-container">
            <ToastContainer />
            <div className="profile-title">
              <Typography variant="h4" className="typoH" align="center">
                Incoming Orders
              </Typography>
            </div>
            <div className="profile-det-container">
              {/* Left side of the profile */}
              <div className="ext-left-profile">
                <img src={profileSide} alt="Background Image" />
              </div>

              {/*incoming orders*/}
              <div className="created-product-container">
                <div className="incoming-order-product-headings">
                  <h3 className="created-product-heading">OrderId</h3>
                  <h3 className="created-product-heading">Status</h3>
                  <h3 className="created-product-heading">Payment Method</h3>
                  <h3 className="created-product-heading">Amount</h3>
                  <h3 className="created-product-heading">Action</h3>
                </div>

                <div className="incoming-orders-main-container">
                  <div>
                    {incomingOrdersForSeller.slice().reverse().map((item) => {  //reverseing array concept of shallow copy read about it more
                      const isExpanded = item._id === expandedOrderId;
                      return (
                        <div
                          className="incoming-order-item-container"
                          key={item._id}
                        >
                          <div className="incoming-order-item">
                            <div
                              className="incoming-order-item-visible"
                              onClick={() => toggleExpand(item._id)}
                            >
                              <p>{item._id}</p>
                              <p>{
                                item.currentSellerStatus.every((item) => item.status === "shipped")
                                  ? "Shipped"
                                  : item.currentSellerStatus.every((item) => item.status === "delivered")
                                    ? "Delivered"
                                    : "Processing"
                              }</p>

                              {/* {
                                  item.currentSellerStatus.every((item)=>item.status === "shipped") ? <p>"Shipped"</p>
                                } */}
                              {/* <p>{item.orderStatus}</p> */}
                              <p>{item.paidAt}</p>
                              <p>Rs.{item.totalOrderAmmountOfSeller}</p>
                              <div>
                                {isExpanded ? (
                                  <ArrowDropUpIcon />
                                ) : (
                                  <ArrowDropDownIcon />
                                )}
                              </div>
                            </div>
                            {isExpanded ? (
                              <>
                                <hr />
                                <div className="incoming-order-item-visible-more">
                                  <div className="incoming-order-item-visible-more-left">
                                    <div className="incoming-order-item-visible-more-left-upper">
                                      <div className="incoming-order-item-visible-more-left-upper-first">
                                        <p>Order Placed</p>
                                        <p>
                                          Total:Rs.
                                          {item.totalOrderAmmountOfSeller}
                                        </p>
                                      </div>
                                      <p>
                                        {new Date(
                                          item.createdAt
                                        ).toLocaleString()}
                                      </p>
                                      <p>ORDER # {item._id}</p>
                                    </div>
                                    <div className="incoming-order-item-visible-more-left-lower">
                                      <p className="item-heading">Items</p>
                                      <ul className="incoming-order-item-visible-more-left-lower-item-container">
                                        {item.orderItems.map((order, index) => (
                                          <li
                                            className="incoming-order-item-visible-more-left-lower-item"
                                            key={index}
                                          >
                                            <div className="incoming-order-item-visible-more-left-lower-item-left">
                                              <img
                                                src={order.image}
                                                alt={order.name}
                                              />
                                            </div>
                                            <div className="incoming-order-item-visible-more-left-lower-item-right">
                                              <b>Name: {order.name}</b>
                                              <div className="incoming-order-item-visible-more-right-lower-PQ-container">
                                                <p>
                                                  Quantity: {order.quantity}
                                                </p>
                                                <p>Price: {order.price}</p>
                                              </div>
                                              <label htmlFor="sellerOrderStatus">
                                                Seller Order Status:
                                              </label>
                                              <div className="seller-order-status-container">
                                                <select
                                                  id={`sellerOrderStatus${order._id}`}  //cartproductID
                                                  // value={orderStatusMap[order._id]}
                                                  value={
                                                    item.currentSellerStatus.every(item => item.status === "shipped") ? "shipped" :
                                                      item.currentSellerStatus.every(item => item.status === "delivered") ? "delivered" :
                                                        "processing"
                                                  }
                                                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                >
                                                  <option value="processing">
                                                    Processing
                                                  </option>
                                                  <option value="shipped">
                                                    Shipped
                                                  </option>
                                                  <option value="delivered">
                                                    Delivered
                                                  </option>
                                                </select>

                                                <button onClick={() => submitStatusHandler(item._id, order._id)} className="order-status-btn" type="sumbit">Save Changes</button>
                                              </div>

                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="incoming-order-item-visible-more-right">
                                    <ul>
                                      <li>State: {item.shippingInfo.state}</li>
                                      <li>
                                        Country: {item.shippingInfo.country}
                                      </li>
                                      <li>
                                        Phone Number:{" "}
                                        {item.shippingInfo.phoneNo}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <hr />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
