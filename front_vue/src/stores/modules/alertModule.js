import { ALERT_MODULE } from "@/stores/const"


export default {
  state: {
    alerts: {},
  },

  mutations: {
    [ALERT_MODULE.SET_ALERT](state, payload) {
      state.alerts = {
        ...state.alerts,
        ...payload
      }
    },
  },

  actions: {
    [ALERT_MODULE.ADD_ALERT]({commit, state}, data) {
      commit(ALERT_MODULE.SET_ALERT, {
        [data.id]: {
          ...data,
          //самоуничтожение :=)
          timerID: (() => setTimeout(() => {
            delete state.alerts[data.id]
          }, 3000))()
        }
      })
    },

    [ALERT_MODULE.CLEAR_ALERT]({commit, state}, data) {
      if(state.alerts[data]) {
        delete state.alerts[data]
        commit(ALERT_MODULE.SET_ALERT, {...state.alerts})
      }
    },
  },

  getters: {
    [ALERT_MODULE.GET_ALERT](state) {
      return state.alerts
    },
  }
}