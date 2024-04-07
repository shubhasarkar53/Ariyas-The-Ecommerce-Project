import { UPLOAD_DOCUMENT_SUCCESS } from "../Constants/registerSellerConstants";
import { SUBMIT_FORM_DATA } from "../Constants/registerSellerConstants";

export const uploadDocumentSuccess = (type) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: type,
});

export const submitFormData = (formData) => ({
  type: SUBMIT_FORM_DATA,
  payload: formData,
});