import { AUTH_MODULE } from "@/stores/const"
import {api, apiLoader} from "../../server"


export default {
  state: {
  },

  mutations: {
  },

  actions: {
    async [AUTH_MODULE.FETCH_AUTH]({commit}, data) {
      return apiLoader(async () => {
        const res = await api.post('login', data)
        localStorage.setItem('token', res.data?.token)
      })
    },
    async [AUTH_MODULE.FETCH_LOGOUT]({commit}, data) {
      return apiLoader(async () => {
        await api.post('logout', data)
        localStorage.removeItem('token')
      })
    },
  },

  getters: {
  }
}