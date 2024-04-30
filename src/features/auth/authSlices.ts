import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthI } from "../../types/auth";

const initialState: AuthI = {
  token: null,
  email: null,
  password: null,
  loading: false,
  error: null,
  reload: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthI>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.token = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setReload: (state, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    }
  },
});

export const { login, logout, setLoading, setError, setReload } = authSlice.actions;

export const authReducer = authSlice.reducer;
