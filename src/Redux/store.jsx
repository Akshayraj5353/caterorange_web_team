import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/RootReducer';
import cartReducer from './Slice/cartSlice'
import authReducer from './Slice/authSlice'

const store = configureStore({
  reducer: rootReducer,
});

export default store;