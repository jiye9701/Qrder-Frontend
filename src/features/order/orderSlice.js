import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

// orderList: list of ALL orders in the db 

// order: store a single order for viewing its details

// customerOrder: after the customer makes an order,
// store the order here, if this state is not empty, 
// the website will bug the customer with the rating page until they submit a 
// rating for the service and the menu items, or click dismiss 
// this is necessary because there is no authorization 

// table: store table number
// unused for now

// systemMessage: store success/failure message

// orderItems: items in the user's order

// status: loading/completed

const initialState = {
    orderList: [],
    order: {},
    customerOrder: localStorage.getItem("customerOrder") ?
        JSON.parse(localStorage.getItem("customerOrder")) :
        {} ,
    table: 0,
    orderItems:    localStorage.getItem("orderItems") ?
        JSON.parse(localStorage.getItem("orderItems")) :
        [] ,
    orderTotalQuantity: 0,
    orderTotalAmount: 0,
    dayTotalSale: 0,
    systemMessage: '',
    status: null,
}

// add a new order
export const addOrder = createAsyncThunk(
    'orders/create',
    async (orderData, thunkAPI) => {
        try {
            return await orderService.addOrder(orderData.restaurant, orderData.data);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const getOrders = createAsyncThunk(
    'orders/all',
    async (_, thunkAPI) => {
        try { 
            return await orderService.getOrders();
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const getDayTip = createAsyncThunk(
    'orders/dayTip',
    async (resId, thunkAPI) => {
        try {
            return await orderService.getDayTip(resId);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const getDayTotalSale = createAsyncThunk(
    'orders/dayTotalSale',
    async (resId, thunkAPI) => {
        try {
            return await orderService.getDayTotalSale(resId);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const getOrderById = createAsyncThunk(
    'orders/one',
    async (id, thunkAPI) => {
        try {
            return await orderService.getOrderById(id);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const getOrdersByResId = createAsyncThunk(
    'orders/res',
    async (id, thunkAPI) => {
        try {
            return await orderService.getOrdersByResId(id);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const updateOrder = createAsyncThunk(
    'orders/update',
    async (updatedOrder, thunkAPI) => {
        try {
            return await orderService.updateOrder(updatedOrder._id, updatedOrder);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const deleteOrder = createAsyncThunk(
    'orders/delete',
    async (id, thunkAPI) => {
        try {
            return await orderService.deleteOrder(id);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    },
);

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingIndex = state.orderItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingIndex >= 0) {
                state.orderItems[existingIndex] = {
                    ...state.orderItems[existingIndex],
                    quantity: state.orderItems[existingIndex].quantity + 1,
                };

                console.log(`${state.orderItems[existingIndex].name} quantity increased`)
            } else {
                let tempProductItem = { ...action.payload, quantity: 1};
                state.orderItems.push(tempProductItem);
                console.log(`${tempProductItem.name} added to cart`);
            }
            localStorage.setItem("orderItems", JSON.stringify(state.orderItems)); 
        },
        decreaseCart(state, action) {
            const itemIndex = state.orderItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (state.orderItems[itemIndex].quantity > 1) {
                state.orderItems[itemIndex].quantity -= 1;
                console.log(`${state.orderItems[itemIndex].name} item quantity decreased`);
            } else if (state.orderItems[itemIndex].quantity === 1) {
                const nextOrderItems = state.orderItems.filter(
                    (item) => item._id !== action.payload._id
                );

                state.orderItems = nextOrderItems;

                console.log(`item removed from order`);
            }

            localStorage.setItem("orderItems", JSON.stringify(state.orderItems));
        },
        removeFromCart(state, action) {
            state.orderItems.map((orderItem) => {
                if (orderItem._id === action.payload._id) {
                    const nextOrderItems = state.orderItems.filter(
                        (item) => item._id !== orderItem._id
                    );

                    state.orderItems = nextOrderItems;

                    console.log(`item ${orderItem.name} removed from order items`);
                }

                localStorage.setItem("orderItems", JSON.stringify(state.orderItems));
                return state;
            });
        },
        getTotals(state, action) {
            let { total, orderQuantity } = state.orderItems.reduce(
                (orderTotal, orderItem) => {
                    const { price, quantity } = orderItem;
                    const itemTotal = price * quantity;

                    orderTotal.total += itemTotal;
                    orderTotal.orderQuantity += quantity;
                    
                    return orderTotal;
                },
                {
                    total: 0,
                    orderQuantity: 0,
                }

            );

            total = parseFloat(total.toFixed(2));
            state.orderTotalQuantity = orderQuantity;
            state.orderTotalAmount = total;
        },
        clearCart(state, action) {
            state.orderItems = [];
            localStorage.setItem("orderItems", JSON.stringify(state.orderItems));
        },
        clearCustomerOrder(state, action) {
            state.customerOrder = {};
            localStorage.setItem("customerOrder", JSON.stringify(state.customerOrder));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.status = 'success';
                state.customerOrder = action.payload;
                localStorage.setItem("customerOrder", JSON.stringify(state.customerOrder));
                state.orderList.push(action.payload);
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.status = 'rejected';
                state.systemMessage = action.payload;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orderList = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getDayTip.fulfilled, (state, action) => {
                state.dayTip = action.payload
                // TODO: look at returned object
            })
            .addCase(getDayTip.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getDayTotalSale.fulfilled, (state, action) => {
                state.dayTotalSale = action.payload;
            })
            .addCase(getDayTotalSale.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getOrdersByResId.fulfilled, (state, action) => {
                state.orderList = action.payload;
            })
            .addCase(getOrdersByResId.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.orderList = state.orderList.map(
                    (order) => order._id === action.payload._id ?
                    { ...order, order: action.payload } :
                    order
                )
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orderList = state.orderList.filter(
                    (order) => order._id !== action.payload._id
                )
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
    }
})

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart, storeCustomerOrder, clearCustomerOrder } = orderSlice.actions;
export default orderSlice.reducer;