import { SET_SELECTED_ADDRESS, CLEAR_SELECTED_ADDRESS } from './actionTypes';

export const setSelectedAddress = (address) => ({
  type: SET_SELECTED_ADDRESS,
  payload: address,
});

export const clearSelectedAddress = () => ({
  type: CLEAR_SELECTED_ADDRESS,
});
