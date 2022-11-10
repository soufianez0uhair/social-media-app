import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
import { USER_API } from "../Api";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${USER_API}/signup`, credentials);

        return response.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${USER_API}/login`, credentials);

        return response.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initializeError(state) {
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.auth = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;
export const selectUser = state => state.auth.user;
export const getStatusAuth = state => state.auth.status;
export const getErrorAuth = state => state.auth.error;
export const {initializeError} = authSlice.actions;