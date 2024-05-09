// import React, { useState, useEffect } from 'react';


// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import profileSide from "../../../assets/Images/Icons/profile icons/pngwing 3.png";
// import pencilIcon from "../../../assets/Images/Icons/createdProductActions/pencil.png";
// import deleteIcon from "../../../assets/Images/Icons/createdProductActions/delete.png";

// import Loader from "../../Loader/Loader";
// import "./CreatedProducts.scss"
// import DotLoader from "../../Loader/DotLoader";






// import { fetchIncomingOrders, updateOrderStatus } from '../redux/actions/orderActions';






// const IncomingOrders = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
// //   const { user } = useSelector(state => state.auth);
// //   const { incomingOrders } = useSelector(state => state.order);

// useEffect(() => {
//     //dispatch icoming order action

//     if (error) {
//       // some toast
//       toast.error(error, {
//         position: "bottom-center",
//         autoClose: 3000,
//       });
//       console.log("useeffect:", error);
//       dispatch(clearError());
//     }

// //    if(isDeliverd){
// //     // some code
// //    }

// },[dispatch,isDeleted,error]);




// return (
//     <>
//     {
//       loading? <DotLoader/> :
//       (
//         <>
//       <div className="profile-container">
//       <ToastContainer />
//         <div className="profile-title">
//           <h2>Incoming Orders</h2>
//         </div>
//         <div className="profile-det-container">
         
//           {/* Left side of the profile */}
//           <div className="ext-left-profile">
//             <img src={profileSide} alt="Background Image" />
//           </div>

//           {/*Created Products */}
//             <div className="created-product-container">
//             <div className="created-product-headings">
//               <h3 className="created-product-heading">ProductImage</h3>
//               <h3 className="created-product-heading">OrderId</h3>
//               <h3 className="created-product-heading">Name</h3>
//               <h3 className="created-product-heading">Stock</h3>
//               <h3 className="created-product-heading">P                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   rice</h3>
//               <h3 className="created-product-heading">Action</h3>
//             </div>
//               <div className="created-products">
//               {
//                     products.map((product)=>{
//                         return(
//                             <div key={product._id} className="create-product-items">
//                                 <div className="created-product-img">
//                                 <img src={`${product.image[0].url}`} alt="image" />
//                                 </div>
//                                 <p >{product._id}</p>
//                                 <p>{product.name}</p>
//                                 <p>{product.stock}</p>
//                                 <p>Rs. {product.price}</p>
//                                 <div className="create-product-actions">
//                                   <button  className="action-edit" onClick={ ()=> handleEditProduct(product._id)}>
//                                     <img src={pencilIcon} alt="Edit" />
//                                   </button>
//                                   <button className="action-delete" onClick={()=> handleDeleteProduct(product._id)}>
//                                   <img src={deleteIcon} alt="Delete" />
//                                   </button>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//               </div>
                
//             </div>


//           {/* Right side of the profile */}
//           <div className="ext-right-profile">
//             <img src={profileSide} alt="Background Image" />
//           </div>
//         </div>
//       </div>
//     </>
//       )
//     }
//     </>
//   );
// };




// export default IncomingOrders;





