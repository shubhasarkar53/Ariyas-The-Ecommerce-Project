/* eslint-disable no-unused-vars */
import {
  SUBMIT_CONTACT_FORM_REQUEST,
  SUBMIT_CONTACT_FORM_SUCCESS,
  SUBMIT_CONTACT_FORM_FAILURE,
} from '../Constants/contactConstants.js';

// Action creators
export const submitContactFormRequest = () => ({
  type: SUBMIT_CONTACT_FORM_REQUEST,
});

export const submitContactFormSuccess = () => ({
  type: SUBMIT_CONTACT_FORM_SUCCESS,
});

export const submitContactFormFailure = (error) => ({
  type: SUBMIT_CONTACT_FORM_FAILURE,
  payload: error,
});

// export const clearContactFormState = () => ({
//   type: CLEAR_CONTACT_FORM_STATE,
// });

// Async action for form submission
export const submitContactForm = (formData) => (dispatch) => {
  dispatch(submitContactFormRequest());

  setTimeout(() => {
    try {
      // Here you would make your actual API request
      // If successful, dispatch success action
      dispatch(submitContactFormSuccess());
      // message sent, dispatch to clear the form
      // dispatch(clearContactFormState());
    } catch (error) {
      // dispatch failure action, if there's an error that occurs
      dispatch(submitContactFormFailure(error.message));
    }
  }, 1000);
};

// Async action for form being cleared
// export const clearContactForm = () => (dispatch) => {
//   dispatch(clearContactFormState);
// }