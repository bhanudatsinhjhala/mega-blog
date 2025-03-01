import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: localStorage.getItem('status') || false,
  userData: localStorage.getItem('userData') || null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
      localStorage.setItem('status', true);
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.setItem('userData', JSON.stringify(state.userData));
      localStorage.setItem('status', true);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
