import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data: response } = await axios.get(
      `http://127.0.0.1:8085/api/productManagement/fetch_all_products`
    );
    console.log(response);
    return await response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
