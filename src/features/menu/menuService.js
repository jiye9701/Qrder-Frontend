import axios from 'axios';

const API_URL = '/api/menu-items/'

// POST: add new menu item to restaurant
const addItem = async (itemData) => {
    const response = await axios.post(API_URL, itemData);

    return response.data;
}

// GET: get all menu items
const getItems = async () => {
    const response = await axios.get(API_URL);

    return response.data;
}

// GET: get menu item by id
const getItemById = async (id) => {
    const response = await axios.get(API_URL + id);

    return response.data;
}

// PUT: update the menu item
const updateItem = async (id, updatedItem) => {
    const response = await axios.put(API_URL + id, updatedItem);

    return response.data;
}

// DEL: delete/remove menu item
const deleteItem = async (id) => {
    const response = await axios.delete(API_URL + id);

    return response.data;
}

const menuService = {
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
}

export default menuService;