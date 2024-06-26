import { SET_SELECTED_ADDRESS, CLEAR_SELECTED_ADDRESS } from '../actions/actionTypes';

const initialState = {
  selectedAddress: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case CLEAR_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: null,
      };
    default:
      return state;
  }
};

export default addressReducer;
