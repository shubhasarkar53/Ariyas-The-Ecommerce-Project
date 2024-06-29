
import axios from 'axios';

const BASE_URL = '/api/v1';

export const sendFormSubmissionEmail = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/confirm-seller`, { formData });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const sendFormSubmissionEmailToAuth = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-email`, { formData });
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw new Error(error.response?.data?.error || "An error occurred while sending the email");
  }
}
