import alertReducer from './alert.slice'
import authReducer from './auth.slice'

const actions = {
  ...alertReducer.actions,
  ...authReducer.actions,
}

const states = {
  ...alertReducer.states,
  ...authReducer.states,
}

const reducers = {
  [alertReducer.name]: alertReducer.reducer,
  [authReducer.name]: authReducer.reducer,
}

export {
  actions,
  states
}

export default reducers