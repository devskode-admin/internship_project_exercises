import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  professionals: [],
  isPending: false,
  error: false,
};

export const getProfessionals = createAsyncThunk(
  "professionals/getProfessionals",
  async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/professionals`, {
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

export const createProfessionals = createAsyncThunk(
  "professionals/createProfessionals",
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/professionals`, {
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

export const deleteProfessionals = createAsyncThunk(
  "professionals/deleteProfessionals",
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/professionals/${payload}`, {
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

export const editProfessionals = createAsyncThunk(
  "professionals/editProfessionals",
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/professionals/${payload.id}`, {
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

export const editManyProfessionals = createAsyncThunk(
  "professionals/editManyProfessionals",
  async (payload) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/professionals/module`, {
      method: "PUT",
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

const professionalSlice = createSlice({
  name: "professionals",
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
        state.professionals = action.payload.data;
      })
      .addCase(getProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(createProfessionals.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createProfessionals.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.professionals = [...state.professionals, action.payload.data];
      })
      .addCase(createProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(deleteProfessionals.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteProfessionals.fulfilled, (state, action) => {
        const filteredProfessionals = state.professionals.filter(
          (professional) => professional._id != action.payload._id
        );
        state.isPending = false;
        state.error = false;
        state.professionals = filteredProfessionals;
      })
      .addCase(deleteProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(editProfessionals.pending, (state) => {
        state.isPending = true;
      })
      .addCase(editProfessionals.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = false;
        state.professionals = state.professionals.map((professional) =>
          professional._id == action.payload.data._id
            ? action.payload.data
            : professional
        );
      })
      .addCase(editProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      })
      .addCase(editManyProfessionals.pending, (state) => {
        state.isPending = true;
      })
      .addCase(editManyProfessionals.fulfilled, (state) => {
        state.isPending = false;
        state.error = false;
      })
      .addCase(editManyProfessionals.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message;
      });
  },
});

export default professionalSlice.reducer;
