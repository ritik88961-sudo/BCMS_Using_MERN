import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "home",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
