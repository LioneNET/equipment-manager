import $api from '@/server';

const token = JSON.parse(localStorage.getItem('token'));

const initialState = {
  isLoading: false,
  status: { loggedIn: token ? true : false },
  token
}

export default {
  state: initialState,
  actions: {
    async login({ commit }, user) {
      let res = []
      commit('loading', true)
      try {
        res = await $api().post('login', {
          email: user.email,
          password: user.password
        })
        if(res['data']) {
          localStorage.setItem('token', JSON.stringify({ accessToken: res.data.token }))
          commit('loginSuccess', { accessToken: res.data.token })
          return Promise.resolve(res)
        }
      } catch (e) {
        res = e.response
        commit('loginFailure')
      } finally {
        commit('loading', false)
      }
      return Promise.reject(res)
    },
    async logout({ commit }) {
      commit('loading', true)
      try {
        await $api().post('logout')
        commit('logout')
      } catch (e) {
        return Promise.reject(e)
      } finally {
        localStorage.removeItem('token')
        commit('loading', false)
      }
      return Promise.resolve(true)
    }
  },
  mutations: {
    loginSuccess(state, token) {
      state.status.loggedIn = true;
      state.token = token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    loading(state, isLoagin) {
      state.isLoading = isLoagin
    }
  }
}