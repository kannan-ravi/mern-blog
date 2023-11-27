import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    registerSuccess: (state) => {
      state.loading = true;
      state.error = false;
    },

    authSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    authFailure: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
    },

    updateStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const allUserSlice = (state) => state.user;
export const {
  authStart,
  registerSuccess,
  authSuccess,
  authFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signOut,
} = userSlice.actions;
export default userSlice.reducer;
