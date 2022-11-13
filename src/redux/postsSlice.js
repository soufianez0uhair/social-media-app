import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { POSTS_API } from "../Api";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (thunkAPI) => {
    try {
        const response = await axios.get(POSTS_API, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });

        return response.data.posts;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const addPost = createAsyncThunk('posts/addPost', async (post, thunkAPI) => {
    try {
        const response = await axios.post(POSTS_API, post, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.post;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkAPI.rejectWithValue(err.response.data.message); 
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.map(post => {
                    if(post.img) {
                        const blob = new Blob([Int8Array.from(post.img.data.data), {type: post.img.contentType}]);

                        post.img = URL.createObjectURL(blob);
                    } else if(post.video) {
                        const blob = new Blob([Int8Array.from(post.video.data.data), {type: post.video.contentType}]);

                        post.video = URL.createObjectURL(blob);
                    }

                    return post;
                })
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                action.payload.likes = {
                    likes: [],
                    loves: [],
                    wows: [],
                    haha: []
                };
                action.payload.comments = [];
                action.payload.shares = [];
                state.posts.unshift(action.payload);
            })
    }
})

export default postsSlice.reducer;
export const selectAllPosts = state => state.posts.posts;
export const getStatusPosts = state => state.posts.status;
export const getErrorPosts = state => state.posts.error;