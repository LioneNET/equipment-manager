import $api from '@/server';

const initialState = {
  isLoading: false,
  equipments: [],
  equipmentsPagination: null,
  equipmentTypes: [],
  limit: 10
}

export default {
  state: initialState,
  actions: {
    async fetchEquipments({ commit }, data) {
      let res = []
      commit('loading1', true)
      try {
        res = await $api().get('equipment', {
          params: {...data, limit: initialState.limit}
        })
        commit('setEquipments', res.data.data)
        commit('setEquipmentsPagination', res.data.meta)
        return Promise.resolve(res)
      } catch (e) {
        res = e.response
        commit('loginFailure')
      } finally {
        commit('loading1', false)
      }
      return Promise.reject(res)
    },
    async fetchEquipmentTypes({ commit }, data) {
      let res = []
      commit('loading1', true)
      try {
        res = await $api().get('equipment_types', {
          params: data
        })
        commit('setEquipmentTypes', res.data.data)
        return Promise.resolve(res)
      } catch (e) {
        res = e.response
        commit('loginFailure')
      } finally {
        commit('loading1', false)
      }
      return Promise.reject(res)
    }
  },
  mutations: {
    setEquipments(state, data) {
      state.equipments = data
    },
    setEquipmentsPagination(state, data) {
      state.equipmentsPagination = data
    },
    setEquipmentTypes(state, data) {
      state.equipmentTypes = data
    },
    loading1(state, isLoagin) {
      state.isLoading = isLoagin
    }
  }
}