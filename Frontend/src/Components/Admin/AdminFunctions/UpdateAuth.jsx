// src/components/UpdateAuthorization.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateAuthorization.scss"; // Import the SCSS file
import DotLoader from "../../Loader/DotLoader";
import { getAllRequestedSellerAction, updateSellerRole } from "../../../Redux/Actions/sellerActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLEAR_ERRORS, UPDATE_SELLER_ROLE_RESET } from "../../../Redux/Constants/sellerConstants";
import { clearError } from "../../../Redux/Actions/productAction";
const UpdateAuthorization = () => {
  const dispatch = useDispatch();
  const { loading, error, sellers,isEdited } = useSelector((state) => state.requestedSellers);

  useEffect(() => {
    dispatch(getAllRequestedSellerAction());

    if(isEdited){
      toast.success("Role Updated Successfully.", {
        position: 'bottom-center',
        autoClose: 3000,
      });

      dispatch({type:UPDATE_SELLER_ROLE_RESET});
    }
    if(error){
      console.log(error);
      toast.error(error, {
        position: 'bottom-center',
        autoClose: 3000,
      });

      console.log("useeffect:", error);
      dispatch(clearError());

    }
  }, [error,dispatch,isEdited]);

  const handleRoleChange = (sellerId, newRole) => {
    dispatch(updateSellerRole(sellerId, newRole))
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <DotLoader />
      ) : (
        <div className="update-authorization">

          <div className="update-auth-heading">
              <h3>Email</h3>
              <h3>Name</h3>
              <h3>Change Role</h3>
          </div>

          {sellers?.map((seller) => (
            <div className="update-authContainer" key={seller._id}>
              <p>{seller.email}</p>
              <p>{seller.name}</p>
              <select
                name="role"
                id="role"
                defaultValue={seller.user.role}
                onChange={(e) => handleRoleChange(seller.user._id, e.target.value)}
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UpdateAuthorization;
