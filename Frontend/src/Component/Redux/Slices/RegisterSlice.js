import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      name: "",
      email: "",
      password: "",
    },
  ],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    signup: (state, { payload }) => {
      console.log(payload);
      state.users = [payload];
    },
  },
});

export const { signup } = registerSlice.actions;
export default registerSlice.reducer;
