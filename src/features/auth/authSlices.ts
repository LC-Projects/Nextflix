import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthI } from "../../types/auth";

const initialState: AuthI = {
  api_key: null,
  account_id: null,
  loading: false,
  error: null,
  reload: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthI>) => {
      state.api_key = action.payload.api_key;
      state.account_id = action.payload.account_id;
    },
    logout: (state) => {
      state.api_key = null;
      state.account_id = null;
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
