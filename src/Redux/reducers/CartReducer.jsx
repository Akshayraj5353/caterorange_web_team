// cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY } from '../actions/actionTypes';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newCartItems = [...state.cartItems, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return {
        ...state,
        cartItems: newCartItems,
      };
    case REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter((_, index) => index !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case UPDATE_CART_ITEM_QUANTITY:
      const { index, quantity } = action.payload;
      const cartItems = state.cartItems.map((item, i) =>
        i === index ? { ...item, mealQuantity: quantity } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cartItems,
      };
    default:
      return state;
  }
};

export default cartReducer;
