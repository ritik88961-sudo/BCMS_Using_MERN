import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  role: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUserRole } = tokenSlice.actions;

export default tokenSlice.reducer;
