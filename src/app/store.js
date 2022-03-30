import { configureStore } from '@reduxjs/toolkit';

import restaurantReducer from '../features/restaurant/restaurantSlice';
import menuReducer from '../features/menu/menuSlice';
import orderReducer from '../features/order/orderSlice';
import itemRatingReducer from '../features/itemRating/itemRatingSlice';

export const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        menu: menuReducer,
        order: orderReducer,
        itemRating: itemRatingReducer,
    }
});
