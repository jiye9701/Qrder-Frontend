import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from './menuService';

const initialState = {
    menuItemsList: [],
    menuItem: {},
    systemMessage: '',
}

export const addItem = createAsyncThunk(
    'menu/create',
    async (itemData, thunkAPI) => {
        try {
            return await menuService.addItem(itemData.form);
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

export const getItems = createAsyncThunk(
    'menu/all',
    async (_, thunkAPI) => {
        try {
            return await menuService.getItems();
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

export const getItemById = createAsyncThunk(
    'menu/one',
    async (id, thunkAPI) => {
        try {
            return await menuService.getItemById(id);
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

export const updateItem = createAsyncThunk(
    'menu/update',
    async (updatedItem, thunkAPI) => {
        try {
            return await menuService.updateItem(updatedItem._id, updatedItem);
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

export const deleteItem = createAsyncThunk(
    'menu/delete',
    async (id, thunkAPI) => {
        try {
            return await menuService.deleteItem(id);
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

export const setItemForUpdate = createAction(
    'menu/setForUpdate',
    function prepare(itemToUpdate) {
        return {
            payload: itemToUpdate,
        };
    },
);

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItem.fulfilled, (state, action) => {
                state.menuItemsList.push(action.payload);
            })
            .addCase(addItem.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.menuItemsList = action.payload;
            })
            .addCase(getItems.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(getItemById.fulfilled, (state, action) => {
                state.menuItem = action.payload;
            })
            .addCase(getItemById.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                state.menuItemsList = state.menuItemsList.map(
                    (item) => item._id === updatedItem._id ?
                    // transform the matching item 
                    { ...item, 
                        name: updateItem.name, 
                        price: updatedItem.price
                    } :
                    // otherwise return original item
                    item
                )
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.menuItemsList = state.menuItemsList.filter(
                    (item) => item._id !== action.payload._id
                );
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.systemMessage = action.payload;
            })
    }
})

export const { reset } = menuSlice.actions;
export default menuSlice.reducer;