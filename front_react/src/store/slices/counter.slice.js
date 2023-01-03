import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {COUNTER_MODULE} from '../const'

const initialState = {
  value: 55,
  status: 'idle',
};

const asyncIncrement = createAsyncThunk(COUNTER_MODULE.COUNTER_INCREMENT_ASYNC, async (amount) => {
  const resp = await new Promise((resolve) =>
      setTimeout(() => resolve({data: amount}), 500)
  )
  return resp.data
})

const slice = createSlice({
  name: COUNTER_MODULE.NAME,
  initialState,

  reducers: {
    [COUNTER_MODULE.COUNTER_INCREMENT]: (state) => {
      state.value += 1;
    },
    [COUNTER_MODULE.COUNTER_DECREMENT]: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(asyncIncrement.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(asyncIncrement.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value += action.payload;
        });
  },
});

const counterSlice = {
  actions: {
    ...slice.actions,
    [COUNTER_MODULE.COUNTER_INCREMENT_ASYNC]: asyncIncrement
  },
  reducer: slice.reducer,
  states: {
    [COUNTER_MODULE.COUNTER_COUNT_STATE]: (state) => state.counter,
  }
}

export default counterSlice
