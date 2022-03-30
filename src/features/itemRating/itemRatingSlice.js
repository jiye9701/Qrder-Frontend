import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemRatingService from './itemRatingService';

const initialState = {
    itemRatings: localStorage.getItem("itemRatings") ? 
        JSON.parse(localStorage.getItem("itemRatings")) :
        {},
    isLoading: false,
    isSuccess: false,
    isError: false,    
    message: "",
}

export const addItemRating = createAsyncThunk(
    'itemRating/create',
    async (data, thunkAPI) => {
        try {
            return await itemRatingService.addItemRating(data);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    }
);

export const getAllItemRatings = createAsyncThunk(
    'itemRating/getAll',
    async (resId, thunkAPI) => {
        try {
            return await itemRatingService.getAllItemRatings(resId);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    }
);

export const getItemRatings = createAsyncThunk(
    'itemRating/getItemRatings',
    async (data, thunkAPI) => {
        try {
            return await itemRatingService.getItemRatings(data.resId, data.itemId);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data &&
                error.response.data.message) || 
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        };
    }
);

export const itemRatingSlice = createSlice({
    name: 'itemRating',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setItemsForRating(state, action) {
            const payload = action.payload.menuItems;
            const itemsForRating = [];
            
            payload.map((item) => {
                itemsForRating.push({
                    restaurant: item.menuItem.restaurant,
                    menuItem: item.menuItem._id,
                    name: item.menuItem.name,
                    price: item.menuItem.price,
                    rating: 0, 
                });
            });

            state.itemRatings = itemsForRating;
            
            localStorage.setItem("itemRatings", JSON.stringify(state.itemRatings));
        },
        changeRating(state, action) {
            const itemIndex = state.itemRatings.findIndex(
                (item) => item.menuItem === action.payload.menuItem
            );

            state.itemRatings[itemIndex].rating = action.payload.rating;

            localStorage.setItem("itemRatings", JSON.stringify(state.itemRatings));
        },
        clearItemsForRating(state, action) {
            state.itemRatings = [];
            localStorage.setItem("itemRatings", JSON.stringify(state.itemRatings));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllItemRatings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllItemRatings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allItemRatings = action.payload;
                state.isSuccess = true;
            })
            .addCase(getAllItemRatings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset, setItemsForRating, changeRating, clearItemsForRating } = itemRatingSlice.actions;
export default itemRatingSlice.reducer;