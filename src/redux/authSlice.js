import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

const initialState = {
    user: localStorage.getItem('user') || null,
    status: 'idle',
    error: null
}

const registerUser = createAsyncThunk('auth/registerUser', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('/signup', credentials);

        return response.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;
export const selectUser = state => state.auth.user;
export const getStatusAuth = state => state.auth.status;
export const getErrorAuth = state => state.auth.error;