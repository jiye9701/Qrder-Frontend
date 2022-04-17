import axios from 'axios';

const API_URL = '/api/order-ratings/';

// create a service rating
const addServiceRating = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const serviceRatingService = {
  addServiceRating,
};

export default serviceRatingService;
