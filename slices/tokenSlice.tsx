import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    updateToken: (state) => {
      state.value = localStorage.getItem("token") ?? "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateToken } = tokenSlice.actions;

export default tokenSlice.reducer;
