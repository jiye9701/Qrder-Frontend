import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import restaurantService from './restaurantService';

// restaurantList: an array of all restaurant objects
// currentRestaurant: stores the single restaurant object that the user is currently 
// ordering food from, according to the restaurant model, this restaurant object will include
// an array of all its menu items (menuItems)
// systemMessage: server response message 
const initialState = {
    restaurantList: [],
    currentRestaurant: {},
    restaurantToUpdate: {},
    systemMessage: '',
}

// add a new restaurant
export const addRestaurant = createAsyncThunk(
    'restaurants/create',
    async (restaurantData, thunkAPI) => {
        try {
            return await restaurantService.addRestaurant(restaurantData.form);
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

// GET all restaurants objects
export const getRestaurants = createAsyncThunk(
    'restaurants/all',
    async (_, thunkAPI) => {
        try {
            return await restaurantService.getRestaurants();
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

// GET a restaurant object by id
export const getRestaurantById = createAsyncThunk(
    'restaurants/one',
    async (resId, thunkAPI) => {
        try {
            return await restaurantService.getRestaurantById(resId);
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


// PUT update a restaurant's info
export const updateRestaurant = createAsyncThunk(
    'restaurants/update',
    async (updatedRestaurant, thunkAPI) => {
        try {
            return await restaurantService.updateRestaurant(updatedRestaurant._id, updatedRestaurant);
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

// DELETE remove restaurant from database
export const deleteRestaurant = createAsyncThunk(
    'restaurants/delete',
    async (resId, thunkAPI) => {
        try {
            return await restaurantService.deleteRestaurant(resId);
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

// set restaurant to update
export const setRestaurantToUpdate = createAction(
    'restaurants/setForUpdate',
    function prepare(resToUpdate) {
        return {
            payload: resToUpdate
        };
    },
);

export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addRestaurant.fulfilled, (state, action) => {
                state.restaurantList.push(action.payload);
            })
            .addCase(addRestaurant.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getRestaurants.fulfilled, (state, action) => {
                state.restaurantList = action.payload;
            })
            .addCase(getRestaurants.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getRestaurantById.fulfilled, (state, action) => {
                state.currentRestaurant = action.payload;
            })
            .addCase(getRestaurantById.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(updateRestaurant.fulfilled, (state, action) => {
                const updatedRestaurant = action.payload;
                state.restaurantList = state.restaurantList.map(
                    (res) => res._id === updatedRestaurant._id ? 
                    // transform the restaurant matching the id
                    { ...res, name: updatedRestaurant.name, isOpen: updatedRestaurant.isOpen } : 
                    // otherwise return original restaurant
                    res )
            })
            .addCase(updateRestaurant.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(deleteRestaurant.fulfilled, (state, action) => {
                state.restaurantList = state.restaurantList.filter(
                    (restaurant) => restaurant._id !== action.payload._id
                );
            })
            .addCase(deleteRestaurant.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(setRestaurantToUpdate, (state, action) => {
                state.restaurantToUpdate = action.payload;
            })
    }
});

export const { reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;

