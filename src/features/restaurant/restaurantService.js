import axios from 'axios';

const API_URL = 'restaurants/'

// POST: creating/adding a new restaurant
const addRestaurant = async (restaurantData) => {
    const response = await axios.post(API_URL, restaurantData);

    return response.data;
};

// GET: fetching/getting information on all restaurants
const getRestaurants = async () => {
    const response = await axios.get(API_URL);
    
    return response.data;
}

// GET: fetching/getting information on a restaurant by its id
const getRestaurantById = async (resId) => {
    const response = await axios.get(API_URL + resId);

    return response.data;
}

// PUT: update a restaurant information 
const updateRestaurant = async (resId, updatedRestaurant) => {
    const response = await axios.put(API_URL + resId, updatedRestaurant); 

    return response.data;
}

// DEL: delete/remove restaurant from database 
const deleteRestaurant = async (resId) => {
    const response = await axios.delete(API_URL + resId);

    return response.data;
}

const restaurantService = {
    addRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
}

export default restaurantService;