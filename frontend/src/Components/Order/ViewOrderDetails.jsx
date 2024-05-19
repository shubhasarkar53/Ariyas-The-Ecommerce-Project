/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "./ViewOrderDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors } from "../../Redux/Actions/orderAction";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Logo from "../../assets/Images/Navbar/logo.png";
import jsPDF from "jspdf";

const ViewOrderDetails = ({ match }) => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);

  // const generateInvoice = () => {
  //   const doc = new jsPDF();
  //   //logo
  //   const img = new Image();
  //   img.src = Logo;
  //   doc.addImage(img, "PNG", 10, 10, 50, 50);

  //   // Header
  //   doc.setFontSize(18);
  //   doc.text("Invoice", 105, 20, { align: "center" });

  //   // Order Details
  //   doc.setFontSize(12);
  //   doc.text(`Order ID: ${order._id}`, 10, 40);
  //   doc.text(`Order Date: ${order.createdAt.substring(0, 10)}`, 10, 50);
  //   doc.text(`Order Status: ${order.orderStatus}`, 10, 60);

  //   // Shipping Info
  //   doc.setFontSize(14);
  //   doc.text("Shipping Info:", 10, 80);
  //   doc.setFontSize(12);
  //   doc.text(`Name: ${order.shippingInfo.fullName}`, 10, 90);
  //   doc.text(`Phone: ${order.shippingInfo.phoneNo}`, 10, 100);
  //   doc.text(
  //     `Address: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`,
  //     10, 110
  //   );

  //   // Billing Info
  //   doc.setFontSize(14);
  //   doc.text("Billing Info:", 10, 130);
  //   doc.setFontSize(12);
  //   doc.text(`Name: ${user.name}`, 10, 140);
  //   doc.text(`Email: ${user.email}`, 10, 150);

  //   // Items
  //   doc.setFontSize(14);
  //   doc.text("Items:", 10, 170);
  //   doc.setFontSize(12);
  //   const startY = 180;
  //   let currentY = startY;

  //   doc.text("Item", 10, currentY);
  //   doc.text("Quantity", 100, currentY);
  //   doc.text("Price", 150, currentY);
  //   doc.text("Total", 180, currentY);
  //   currentY += 10;

  //   order.orderItems.forEach((item, index) => {
  //     doc.text(`${item.name}`, 10, currentY);
  //     doc.text(`${item.quantity}`, 100, currentY);
  //     doc.text(`₹${item.price}`, 150, currentY);
  //     doc.text(`₹${item.quantity * item.price}`, 180, currentY);
  //     currentY += 10;
  //   });

  //   // Summary
  //   doc.setFontSize(14);
  //   doc.text("Summary:", 10, currentY + 10);
  //   doc.setFontSize(12);
  //   currentY += 20;
  //   doc.text(`Total Order Amount: ₹${order.totalPrice}`, 10, currentY);
  //   doc.text(`Shipping Price: ₹${order.shippingPrice}`, 10, currentY + 10);
  //   doc.text(`Tax: ₹${order.taxPrice}`, 10, currentY + 20);
  //   doc.text(`Total: ₹${order.totalPrice + order.shippingPrice + order.taxPrice}`, 10, currentY + 30);

  //   doc.save(`invoice_${order._id}.pdf`);
  // };

  const generateInvoice = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = Logo;
    img.onload = () => {
      // Header with logo
      doc.addImage(img, "PNG", 10, 10, 50, 50);

      // Header text
      doc.setFontSize(40);
      doc.text("Invoice", 70, 30, { align: "center" });

      // Order Details
      doc.setFontSize(12);
      doc.text(`Order ID: ${order._id}`, 10, 70);
      doc.text(`Order Date: ${order.createdAt.substring(0, 10)}`, 10, 80);
      doc.text(`Order Status: ${order.orderStatus}`, 10, 90);
      doc.text("Payment Method: Cash On Delivery", 10, 100);

      // Shipping Info
      doc.setFontSize(14);
      doc.text("Shipping Info:", 10, 110);
      doc.setFontSize(12);
      doc.text(`Name: ${order.shippingInfo.fullName}`, 10, 120);
      doc.text(`Phone: ${order.shippingInfo.phoneNo}`, 10, 130);
      doc.text(
        `Address: ${order.shippingInfo.address},
                  ${order.shippingInfo.state}, 
                  ${order.shippingInfo.country},
                  ${order.shippingInfo.pinCode}`,
                 10,140
      );

      // Billing Info
      doc.setFontSize(14);
      doc.text("Billing Info:", 10, 170);
      doc.setFontSize(12);
      doc.text(`Name: ${user.name}`, 10, 180);
      doc.text(`Email: ${user.email}`, 10, 190);

      // Items
      doc.setFontSize(14);
      doc.text("Items:", 10, 200);
      doc.setFontSize(12);
      let currentY = 210;
      doc.text("Item", 10, currentY);
      doc.text("Quantity", 100, currentY);
      doc.text("Price", 150, currentY);
      doc.text("Total", 180, currentY);
      currentY += 10;

      order.orderItems.forEach((item) => {
        const itemName = doc.splitTextToSize(item.name, 90);
        doc.text(itemName, 10, currentY);
        doc.text(`${item.quantity}`, 100, currentY);
        doc.text(`₹${item.price}`, 150, currentY);
        doc.text(`₹${item.quantity * item.price}`, 180, currentY);
        currentY += 10;
      });

      // Summary
      doc.setFontSize(14);
      doc.text("Summary:", 10, currentY + 10);
      doc.setFontSize(12);
      currentY += 20;
      doc.text(`Total Order Amount: ₹${order.totalPrice}`, 10, currentY);
      doc.text(`Shipping Price: ₹${order.shippingPrice}`, 10, currentY + 10);
      doc.text(`Tax: ₹${order.taxPrice}`, 10, currentY + 20);
      // doc.text(`Total: ₹${order.totalPrice + order.shippingPrice + order.taxPrice}`, 10, currentY + 30);

      doc.save(`invoice_${order._id}.pdf`);
    };
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsContainer">
            <h1>{user.name}&apos;s Order Details</h1>
            <div className="orderDetailsHeader">
              {/* order details */}
              <div className="orderDetailsLeft">
                <h1>Order Details</h1>
                <p className="orderDetailsId">
                  <b>Order ID:</b> <span>{order && order._id}</span>
                </p>
                <p className="orderDetailsId">
                  <b>Order Date:</b>
                  <span>{order && order.createdAt.substring(0, 10)}</span>
                </p>
                <p className="orderDetailsId">
                  <b>Total Order Amount:</b>
                  <span>${order && order.totalPrice}</span>
                </p>
                <p className="orderDetailsId">
                  <b>Shipping Price:</b>
                  <span>${order && order.shippingPrice}</span>
                </p>
                <p className="orderDetailsId">
                  <b>Tax:</b>
                  <span>${order && order.itemPrice}</span>
                </p>
                <p className="orderDetailsId">
                  <b>Order Status:</b>
                  <span>{order && order.orderStatus}</span>
                </p>
              </div>

              <div className="flex-pay-ship-container">
                {/* payment info */}
                <div className="paymentInfo">
                  <h1>Payment Info</h1>
                  <p>
                    <b>Amount:</b>
                    <span>${order && order.totalPrice}</span>
                  </p>
                  <p>
                    <b>Method:</b>
                    <span>Cash On Delivery</span>
                  </p>
                  <div className="inv-container">
                  {order && order.orderStatus === "delivered" && (
                    <Button
                      className="invBtn"
                      variant="contained"
                      onClick={generateInvoice}
                      style={{ marginTop: "20px" }}
                    >
                      Generate Invoice
                    </Button>
                  )}
                  </div>
                </div>

                {/* shipping info */}
                <div className="shippingInfo">
                  <h1>Shipping Info</h1>
                  <p>
                    <b>Name:</b>{" "}
                    <span>
                      {order &&
                        order.shippingInfo &&
                        order.shippingInfo.fullName}
                    </span>
                  </p>
                  <p>
                    <b>Phone:</b>{" "}
                    <span>
                      {order &&
                        order.shippingInfo &&
                        order.shippingInfo.phoneNo}
                    </span>
                  </p>
                  <p>
                    <b>Address:</b>
                    <div className="addDetailsTab">
                      {order && order.shippingInfo && (
                        <div className="addressItem">
                          <span>{order.shippingInfo.address}</span>
                          <span>{order.shippingInfo.city}</span>
                          <span>{order.shippingInfo.state}</span>
                          <span>{order.shippingInfo.country}</span>
                          <span>{order.shippingInfo.pinCode}</span>
                        </div>
                      )}
                    </div>
                  </p>
                  {/* {order && order.orderStatus === "delivered" && (
                    <Button
                      className="invBtn"
                      variant="contained"
                      onClick={generateInvoice}
                      style={{ marginTop: "20px" }}
                    >
                      Generate Invoice
                    </Button>
                  )} */}
                </div>
              </div>
            </div>

            <div className="orderDetailsContainerBox">
              <div className="orderDetailsContainerBoxItem">
                <h1>Item&apos;s</h1>
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="items">
                      <img src={item.image} alt="Product" className="imgItem" />
                      <div className="items-det-container">
                        <Link
                          className="productLink"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                        <p className="itemQnt">
                          {item.quantity} X &#8377;{item.price} = &#8377;
                          {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

ViewOrderDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ViewOrderDetails;
