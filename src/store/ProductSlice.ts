import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Products } from '../types/types';

interface DataState {
  items: Products[];  // Fix: items should be of type Products[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Async thunk to fetch data from API
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.get<{ data: Products[] }>(`${apiUrl}/api/v1/products/getProducts`);
    console.log(response.data)
    return response.data.data; 
  }
);

// Slice definition
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [], 
    status: 'idle',
    error: null,
  } as DataState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default dataSlice.reducer;
