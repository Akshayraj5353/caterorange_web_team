import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CartProvider from '../src/components/supriya/Cartcontext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <GoogleOAuthProvider clientId="711298105373-5l0qn2f5oa1hnih8shaqot81frpj958f.apps.googleusercontent.com">
        <CartProvider>
          <App />
        </CartProvider>
      </GoogleOAuthProvider>

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
