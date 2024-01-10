import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isPending: false,
  error: false,
};

export const getTechnologies = createAsyncThunk('technology/getTechnologies', async () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/technologies`, {
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

export const deleteTechnology = createAsyncThunk('technology/deleteTechnology', async (payload) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/technologies/${payload}`, {
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
});

const technologySlice = createSlice({
  name: 'technologies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTechnologies.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.list = action.payload.data;
      })
      .addCase(getTechnologies.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(deleteTechnology.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteTechnology.fulfilled, (state, action) => {
        const filteredTechnologies = state.list.filter((tech) => tech._id != action.payload._id);
        state.isPending = false;
        state.error = false;
        state.list = filteredTechnologies;
      })
      .addCase(deleteTechnology.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      });
  },
});

export default technologySlice.reducer;
