import { createSlice } from '@reduxjs/toolkit';
import {ALERT_MODULE} from '../const'

const initialState = {
  alerts: {},
};

const name = ALERT_MODULE.NAME

const slice = createSlice({
  name,
  initialState,

  reducers: {
    [ALERT_MODULE.ALERT_ADD_ACTION]: (state, action) => {
      const newAlert = action.payload
      state.alerts = {
        ...state.alerts,
        [newAlert.id]: {
          ...newAlert
        }
      }
    },
    [ALERT_MODULE.ALERT_DELETE_ACTION]: (state, action) => {
      if(state.alerts[action.payload]) {
        delete state.alerts[action.payload]
      }
    }
  }
});

const counterSlice = {
  name: ALERT_MODULE.NAME,
  actions: {
    ...slice.actions,
  },
  reducer: slice.reducer,
  states: {
    [ALERT_MODULE.ALERT_GET_STATE]: (state) => state[ALERT_MODULE.NAME],
  }
}

export default counterSlice
