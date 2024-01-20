import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isPending: false,
  error: false,
};

export const getProfessionals = createAsyncThunk('professionals/getProfessionals', async () => {
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

export const deleteProfessionals = createAsyncThunk(
  'professionals/deleteProfessionals',
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/professionals/${payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    } else {
      const obj = {
        _id: payload,
        data,
      };
      return obj;
    }
  },
);

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
      })
      .addCase(deleteProfessionals.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteProfessionals.fulfilled, (state, action) => {
        const filteredProfessionals = state.list.filter((prof) => prof._id != action.payload._id);
        state.isPending = false;
        state.error = false;
        state.list = filteredProfessionals;
      })
      .addCase(deleteProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      });
  },
});

export default professionalSlice.reducer;
