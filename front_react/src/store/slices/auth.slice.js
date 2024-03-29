import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AUTH_MODULE} from '../const'
import {api, apiLoader} from "../../api";

const initialState = {
  isLoading: false,
  token: null
};

const asyncLogin = createAsyncThunk(AUTH_MODULE.POST_AUTH_LOGIN_ACTION, async (data) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.post('login', data)
  })
  return resp.data
})

const asyncLogout = createAsyncThunk(AUTH_MODULE.POST_AUTH_LOGOUT_ACTION, async (data) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.post('logout')
  })
  return resp.data
})

const slice = createSlice({
  name: AUTH_MODULE.NAME,
  initialState,

  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(asyncLogin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(asyncLogin.fulfilled, (state, action) => {
          state.isLoading = false;
          if(action.payload?.token) {
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
            window.location.href = '/'
          }
        })
        .addCase(asyncLogout.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(asyncLogout.fulfilled, (state, action) => {
          state.isLoading = false;
          localStorage.removeItem('token')
          window.location.href = '/'
        })
  },
});

const authSlice = {
  name: AUTH_MODULE.NAME,
  actions: {
    ...slice.actions,
    [AUTH_MODULE.POST_AUTH_LOGIN_ACTION]: asyncLogin,
    [AUTH_MODULE.POST_AUTH_LOGOUT_ACTION]: asyncLogout,
  },
  reducer: slice.reducer,
  states: {
    [AUTH_MODULE.AUTH_GET_STATE]: (state) => state[AUTH_MODULE.NAME],
  }
}

export default authSlice
