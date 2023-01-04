import alertReducer from './alert.slice'
import authReducer from './auth.slice'
import equipmentReducer from './equipment.slice'

const actions = {
  ...alertReducer.actions,
  ...authReducer.actions,
  ...equipmentReducer.actions,
}

const states = {
  ...alertReducer.states,
  ...authReducer.states,
  ...equipmentReducer.states,
}

const reducers = {
  [alertReducer.name]: alertReducer.reducer,
  [authReducer.name]: authReducer.reducer,
  [equipmentReducer.name]: equipmentReducer.reducer,
}

export {
  actions,
  states
}

export default reducers