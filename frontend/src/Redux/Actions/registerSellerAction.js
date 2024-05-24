import { UPLOAD_DOCUMENT_SUCCESS, SUBMIT_FORM_DATA, UPDATE_FORM_DATA } from "../Constants/registerSellerConstants";

export const updateFormData = (formData) => ({
  type: UPDATE_FORM_DATA,
  payload: formData,
});

export const uploadDocumentSuccess = (documentUrl) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: documentUrl,
});

export const submitFormData = (formData) => ({
  type: SUBMIT_FORM_DATA,
  payload: formData,
});

