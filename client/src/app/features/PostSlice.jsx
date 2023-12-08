import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  singlePost: null,
  myPost: null,
  error: false,
  loading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getUserPostStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getUserPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserPostSuccess: (state, action) => {
      state.myPost = action.payload;
      state.error = false;
      state.loading = false;
    },

    getPostStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getPostSuccess: (state, action) => {
      state.posts = action.payload;
      state.error = false;
      state.loading = false;
    },
  },
});

export const allPostSlice = (state) => state.post;
export const {
  getUserPostStart,
  getUserPostFailure,
  getUserPostSuccess,
  getPostStart,
  getPostFailure,
  getPostSuccess,
} = postSlice.actions;
export default postSlice.reducer;
