// reducers.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import addressReducer from './addressReducer'
import cartReducer from './CartReducer'

const rootReducer = combineReducers({
    authentication: authReducer,
    address: addressReducer,
    cart: cartReducer
});

export default rootReducer;
