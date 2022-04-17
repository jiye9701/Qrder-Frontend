import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import restaurantService from './restaurantService';
import itemRatingService from '../itemRating/itemRatingService';
import menuService from '../menu/menuService';
import orderService from '../order/orderService';

// restaurantList: an array of all restaurant objects
// currentRestaurant: stores the single restaurant object that the user is currently
// ordering food from, according to the restaurant model, this restaurant object will include
// an array of all its menu items (menuItems)
// message: server response message
const initialState = {
  restaurantList: [],
  currentRestaurant: {},
  restaurantToUpdate: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// restaurant controls
//
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
    }
  }
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
    }
  }
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
    }
  }
);

// PUT update a restaurant's info
export const updateRestaurant = createAsyncThunk(
  'restaurants/update',
  async (updatedRestaurant, thunkAPI) => {
    try {
      return await restaurantService.updateRestaurant(
        updatedRestaurant._id,
        updatedRestaurant
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
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
    }
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
    }
  }
);

// menu item controlls
//
// add new menu item
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
    }
  }
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
    }
  }
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
    }
  }
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
    }
  }
);

export const getDayTotalTip = createAsyncThunk(
  'orders/dayTotalTip',
  async (resId, thunkAPI) => {
    try {
      return await restaurantService.getDayTotalTip(resId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setRestaurantToUpdate(state, action) {
      state.restaurantToUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDayTotalTip.fulfilled, (state, action) => {
        const totalDayTip = action.payload;
        const roundedTotal = (Math.round(totalDayTip * 100) / 100).toFixed(2);
        state.currentRestaurant.totalDayTip = totalDayTip;
      })
      .addCase(getDayTotalTip.rejected, (state, action) => {
        state.systemMessage = action.payload;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurantList.push(action.payload);
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.restaurantList = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.currentRestaurant = action.payload;
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const updatedRestaurant = action.payload;
        state.restaurantList = state.restaurantList.map((res) =>
          res._id === updatedRestaurant._id
            ? // transform the restaurant matching the id
              {
                ...res,
                name: updatedRestaurant.name,
                isOpen: updatedRestaurant.isOpen,
              }
            : // otherwise return original restaurant
              res
        );
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.filter(
          (restaurant) => restaurant._id !== action.payload._id
        );
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(getAllItemRatings.fulfilled, (state, action) => {
        const allRatings = action.payload;
        const itemRatings = [];
        allRatings.map((item) => {
          itemRatings.push({
            menuItem: item.menuItem,
            rating: item.rating,
          });
        });

        let groupedItemRatings = [];

        itemRatings.map((item) => {
          const existingIndex = groupedItemRatings.findIndex(
            (arrayItem) => arrayItem.menuItem === item.menuItem
          );
          if (existingIndex >= 0) {
            groupedItemRatings[existingIndex].totalRating += item.rating;
            groupedItemRatings[existingIndex].rateCount += 1;
          } else {
            let tempItem = {
              menuItem: item.menuItem,
              rateCount: 1,
              totalRating: item.rating,
            };

            groupedItemRatings.push(tempItem);
          }
        });

        groupedItemRatings.map((groupedItem) => {
          const existingIndex = state.currentRestaurant.menuItems.findIndex(
            (menuItem) => menuItem._id === groupedItem.menuItem
          );

          if (existingIndex >= 0) {
            const averageRating =
              groupedItem.totalRating / groupedItem.rateCount;

            state.currentRestaurant.menuItems[existingIndex].averageRating =
              averageRating;
          }
        });
      })
      // add menu item
      // .addCase(addItem.fulfilled, (state, action) => {
      //     state.currentRestaurant.menuItems
      // })
      // edit menu item
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        // const menu = state.currentRestaurant.menuItems;

        // console.log(updatedItem);
        // console.log(menu[0]);
        state.currentRestaurant.menuItems =
          state.currentRestaurant.menuItems.map((item) =>
            item._id === updatedItem._id
              ? {
                  ...item,
                  name: updatedItem.name,
                  price: updatedItem.price,
                  description: updatedItem.description,
                }
              : item
          );
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const deletedItemId = action.payload._id;

        state.currentRestaurant.menuItems =
          state.currentRestaurant.menuItems.filter(
            (item) => item._id !== deletedItemId
          );
      })
      .addCase(getDayTotalSale.fulfilled, (state, action) => {
        const { totalDaySale } = action.payload;
        const roundedTotal = (Math.round(totalDaySale * 100) / 100).toFixed(2);
        state.currentRestaurant.totalDaySale = roundedTotal;
      })
      .addCase(getDayTotalSale.rejected, (state, action) => {
        state.systemMessage = action.payload;
      });
  },
});

export const { setRestaurantToUpdate, reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
