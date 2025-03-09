import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: [],
    currentPage: 1,
    itemsPerPage: 10,
    categories: [],
    brands: [],
    totalSaleData: [],
  },
  reducers: {
    setSalesData: (state, action) => {
      state.salesData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setTotalSalesData: (state, action) => {
      state.totalSaleData = action.payload;
    },
  },
});

export const {
  setSalesData,
  setCurrentPage,
  setCategories,
  setBrands,
  setTotalSalesData,
} = salesSlice.actions;
export default salesSlice.reducer;
