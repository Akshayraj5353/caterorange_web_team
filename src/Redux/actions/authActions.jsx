import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actionTypes';

export const login = (input) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:9000/api/user/login', input);
        const token = response.data.token;
        localStorage.setItem('token', token);
        dispatch({ type: LOGIN_SUCCESS, payload: token });
        return token;
    } catch (error) {
        let errorMessage = 'An error occurred. Please try again.';
        if (error.response) {
            const responseData = error.response.data;
            errorMessage = responseData.error || 'Login failed. Please check your credentials and try again.';
            if (error.response.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
        } else if (error.request) {
            errorMessage = 'No response from the server. Please try again later.';
        }
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        throw new Error(errorMessage);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};