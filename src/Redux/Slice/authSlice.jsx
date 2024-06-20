// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (input, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:9000/api/user/login', input);
        const token = response.data.token;
        localStorage.setItem('token', token);
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
        return rejectWithValue(errorMessage);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    localStorage.removeItem('token');
    dispatch(authSlice.actions.logout());
});

const initialState = {
    token: localStorage.getItem('token'),
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.token = null;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.error = null;
            });
    },
});

export const { logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
