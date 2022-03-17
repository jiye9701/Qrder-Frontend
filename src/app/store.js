import { configureStore } from '@reduxjs/toolkit';

import restaurantReducer from '../features/restaurant/restaurantSlice';

export const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,

    }
});
