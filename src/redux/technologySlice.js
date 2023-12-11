import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isPending: false,
  error: false,
};

export const getTechnologies = createAsyncThunk(
  "technology/getTechnologies",
  async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/technologies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  }
);

export const createTechnology = createAsyncThunk(
    "technology/createTechnology",
    async (payload) => {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/technologies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      return data;
    }
  );

export const editTechnology = createAsyncThunk(
  "technology/editTechnology",
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/technologies/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload.body),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  }
);

export const deleteTechnology = createAsyncThunk(
  "technology/deleteTechnology",
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/technologies/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
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
  }
);

const technologySlice = createSlice({
  name: "technologies",
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
      .addCase(createTechnology.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createTechnology.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.list = [...state.list, action.payload.data];
      })
      .addCase(createTechnology.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(deleteTechnology.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteTechnology.fulfilled, (state, action) => {
        const filteredCompanies = state.list.filter(
          (company) => company._id != action.payload._id
        );
        state.isPending = false;
        state.error = false;
        state.list = filteredCompanies;
      })
      .addCase(deleteTechnology.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(editTechnology.pending, (state) => {
        state.isPending = true;
      })
      .addCase(editTechnology.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.list = state.list.map((technology) =>
          technology._id == action.payload.data._id
            ? action.payload.data
            : technology
        );
      })
      .addCase(editTechnology.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      });
  },
});

export default technologySlice.reducer;
