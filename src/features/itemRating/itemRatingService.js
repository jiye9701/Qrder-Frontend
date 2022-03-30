import axios from 'axios';

const API_URL = '/api/item-ratings/';

// create an item rating 
const addItemRating = async (data) => {
    const response = await axios.post(API_URL, data);

    return response.data;
}

// get all item ratings for restaurant
const getAllItemRatings = async (resId) => {
    const response = await axios.get(API_URL + resId);

    return response.data;
}

// get all item ratings for a single item
const getItemRatings = async (resId, itemId) => {
    const response = await axios.get(API_URL + resId + '/' + itemId);

    return response.data;
}

const itemRatingService = {
    addItemRating,
    getAllItemRatings,
    getItemRatings
}

export default itemRatingService;