import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
