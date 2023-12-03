import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  singlePost: null,
  editPost: null,
  error: false,
  loading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    editingPost: (state, action) => {
      state.editPost = action.payload;
    },
  },
});

export const allPostSlice = (state) => state.post;
export const { editingPost } = postSlice.actions;
export default postSlice.reducer;
