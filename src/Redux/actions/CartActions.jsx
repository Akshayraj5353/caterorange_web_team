// CartActions.js
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY } from './actionTypes';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});

export const updateCartItemQuantity = (index, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { index, quantity },
});
