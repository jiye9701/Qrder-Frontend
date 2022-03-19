import axios from 'axios';

const API_URL = '/api/orders/';

// POST: add new order
const addOrder = async (resId, orderData) => {
    const response = await axios.post(API_URL + resId, orderData);

    return response.data;
}

// GET: get all orders
const getOrders = async () => {
    const response = await axios.get(API_URL);

    return response.data;
}

// GET: get all tips for the past 24hrs for restaurant
const getDayTip = async (resId) => {
    // NOTE: this one is expecting a restaurant ID
    const response = await axios.get(API_URL + 'tips/' + resId);

    return response.data;
}

// GET: get order by id
const getOrderById = async (id) => {
    const response = await axios.get(API_URL + id);

    return response.data;
}

// PUT: update order 
const updateOrder = async (id, updatedOrder) => {
    const response = await axios.put(API_URL + id, updatedOrder);

    return response.data;
}


// DEL: delete order
const deleteOrder = async (id) => {
    const response = await axios.put(API_URL + id);

    return response.data;
}

const orderService = {
    addOrder,
    getOrders,
    getDayTip,
    getOrderById,
    updateOrder,
    deleteOrder,
}

export default orderService;
