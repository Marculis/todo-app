import { AppAPI } from "./API/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAuth = createAsyncThunk(
  "appReducer/getAuth",
  async (nu, { rejectWithValue, dispatch }) => {
    try {
      const response = await AppAPI.getAuth();
      dispatch(setAuth(response));
    } catch {
      return rejectWithValue("Auth request error!");
    }
  }
);

export const getLogin = createAsyncThunk(
  "appReducer/getLogin",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      await AppAPI.postLogin(body);
      dispatch(getAuth());
    } catch {
      return rejectWithValue("Request for loginisation is error!");
    }
  }
);

export const getLogout = createAsyncThunk(
  "appReducer/getLogout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await AppAPI.deleteLogin();
      dispatch(getAuth());
    } catch {
      return rejectWithValue("Logout request error!");
    }
  }
);

const setError = (state, action) => {
  state.error = action.payload;
};
const setLoadindTrue = (state) => {
  state.isLoading = true;
};

const setLoadindFalse = (state) => {
  state.isLoading = false;
};

export const appReducer = createSlice({
  name: "appReducer",
  initialState: {
    id: "1234",
    email: "mail",
    login: "login",
    isAuth: false,
    error: null,
    isLoading: true,
  },
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.data.id;
      state.email = action.payload.data.email;
      state.login = action.payload.data.login;

      state.id && state.email && state.login
        ? (state.isAuth = true)
        : (state.isAuth = false);

      action.payload.messages.length > 0
        ? (state.error = action.payload.messages[0])
        : (state.error = "");
    },
  },
  extraReducers: {
    [getAuth.pending]: setLoadindTrue,
    [getLogin.pending]: setLoadindTrue,
    [getLogout.pending]: setLoadindTrue,

    [getAuth.fulfilled]: setLoadindFalse,
    [getLogin.fulfilled]: setLoadindFalse,
    [getLogout.fulfilled]: setLoadindFalse,

    [getAuth.rejected]: setError,
    [getLogin.rejected]: setError,
    [getLogout.rejected]: setError,
  },
});

export const { setAuth } = appReducer.actions;
export default appReducer.reducer;
