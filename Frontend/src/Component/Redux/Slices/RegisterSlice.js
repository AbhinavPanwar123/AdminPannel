import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellers: [
    {
      name: "",
      email: "",
      phone:"",
      address:"",
      gstin:"",
      password: ""
    }
  ],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    signup: (state, { payload }) => {
      console.log(payload);
      state.sellers = [payload];
    },
  },
});

export const { signup } = registerSlice.actions;
export default registerSlice.reducer;
