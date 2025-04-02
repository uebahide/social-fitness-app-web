import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { user } from "../types/user";
import axios from "axios";
import { API_URL } from "../constants";
import { store } from "~/store";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",

  async () => {
    const token = store.getState().token.value;

    if (token) {
      const res = await axios.get<user>(`/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } else {
      return null;
    }
  },
);

type userStatus = {
  value: user | null;
  status: "idle" | "pending" | "success" | "failed";
};

const initialState: userStatus = {
  value: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.value = action.payload;
        state.status = "success";
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.value = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
