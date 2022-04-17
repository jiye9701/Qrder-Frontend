import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serviceRatingService from './serviceRatingService';

export const addServiceRating = createAsyncThunk(
  'serviceRating/create',
  async (data, thunkAPI) => {
    try {
      return await serviceRatingService.addServiceRating(data);
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
