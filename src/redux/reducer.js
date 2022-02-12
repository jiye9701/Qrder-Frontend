import { ADD_CART, SET_DATA } from "./types";

const initialState = {
  restaurantId: "",
  tableId: "",
  orders: [],
  total: 0,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      console.log("reducer output", action);
      let order = {
        title: action.title,
        name: action.title,
        price: action.price,
        isCancelled: false,
        isOverwritten: false,
      };
      let orders_buf = state.orders;
      let total_buf = state.total + action.price;
      return {
        ...state,
        orders: [...orders_buf, order],
        total: total_buf,
      };
    case SET_DATA:
      return {
        ...state,
        tableId: action.tableId,
        restaurantId: action.restaurantId,
        orderId: action.orderId,
      };
    default:
      return state;
  }
}
