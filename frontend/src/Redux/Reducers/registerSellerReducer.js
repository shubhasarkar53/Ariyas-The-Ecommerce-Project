import { UPLOAD_DOCUMENT_SUCCESS, SUBMIT_FORM_DATA } from '../Constants/registerSellerConstants';

const initialState = {
  uploadedDocuments: [],
  formData: null,
};

const registerSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        uploadedDocuments: [...state.uploadedDocuments, action.payload],
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


