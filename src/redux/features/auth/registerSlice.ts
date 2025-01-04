import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  role: "student",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = registerSlice.actions;

export default registerSlice.reducer;
