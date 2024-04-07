// registerSellerReducer.js
import { UPLOAD_DOCUMENT_SUCCESS } from '../Constants/registerSellerConstants';
import { SUBMIT_FORM_DATA } from '../Constants/registerSellerConstants';

const initialState = {
  uploadedDocument: null,
  formData: null,
};

const registerSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        uploadedDocument: action.payload,
      };
    case SUBMIT_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default registerSellerReducer;
