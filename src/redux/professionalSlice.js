import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isPending: false,
  error: false,
};

export const getProfessionals = createAsyncThunk('technology/getProfessionals', async () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/professionals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.message);
  }
  return data;
});

const professionalSlice = createSlice({
  name: 'professionals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfessionals.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getProfessionals.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.list = action.payload.data;
      })
      .addCase(getProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      });
  },
});

export default professionalSlice.reducer;
