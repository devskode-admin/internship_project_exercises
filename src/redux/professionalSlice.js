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

export const deleteProfessional = createAsyncThunk(
  'professionals/deleteProfessional',
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

export const createProfessional = createAsyncThunk(
  'professionals/createProfessional',
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/professionals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  },
);

export const editProfessional = createAsyncThunk('technology/editProfessional', async (payload) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/professionals/${payload._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload.body),
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
      })
      .addCase(deleteProfessional.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteProfessional.fulfilled, (state, action) => {
        const filteredProfessionals = state.list.filter((prof) => prof._id != action.payload._id);
        state.isPending = false;
        state.error = false;
        state.list = filteredProfessionals;
      })
      .addCase(deleteProfessional.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(createProfessional.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createProfessional.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.list = [...state.list, action.payload.data];
      })
      .addCase(createProfessional.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(editProfessional.pending, (state) => {
        state.isPending = true;
      })
      .addCase(editProfessional.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.list = state.list.map((prof) =>
          prof._id === action.payload.data._id ? action.payload.data : prof,
        );
      })
      .addCase(editProfessional.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      });
  },
});

export default professionalSlice.reducer;
