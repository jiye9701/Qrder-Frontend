import axios from 'axios';

const API_URL = '/api/restaurants/';
const MENU_API_URL = '/api/menu-items';
const ORDER_API_URL = '/api/orders/'

// restaurant controllers
//
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

// restaurant's menu items controllers
//

// POST: add new menu item to restaurant
const addItem = async (itemData) => {
    const response = await axios.post(MENU_API_URL, itemData);

    return response.data;
}

// PUT: update the menu item
const updateItem = async (id, updatedItem) => {
    const response = await axios.put(MENU_API_URL + id, updatedItem);

    return response.data;
} 

// DEL: delete/remove menu item
const deleteItem = async (id) => {
    const response = await axios.delete(MENU_API_URL + id);

    return response.data;
}

// restaurant orders
//
// GET: get the total sales for the past 24hrs for restaurant
// (tip not included)
const getDayTotalSale = async (resId) => {
    const response = await axios.get(ORDER_API_URL + 'daytotal/' + resId);
  
    return response.data;
}

const restaurantService = {
    addRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    addItem,
    updateItem,
    deleteItem,
    getDayTotalSale,
}

export default restaurantService;