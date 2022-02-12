import { ADD_CART } from "./types";

// Add Post
export const addCart =
  ({ title, price }) =>
  (dispatch) => {
    dispatch({
      type: ADD_CART,
      title: title,
      price: price,
    });
  };
