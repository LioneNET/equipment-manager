import { EQUIPMENT_MODULE } from "@/stores/const"
import {api, apiLoader} from "../../server";


export default {
  state: {
    equipment: {},
    equipmentPut: {},
    equipments: {
      data: [],
      meta: {
        page: 1,
        per_page: "15",
        current_page: 1,
        total: 0,
        to: 0
      }
    },

    equipmentTypes: {
      data: [],
      meta: {
        page: 1,
        per_page: "15",
        current_page: 1,
        total: 0,
        to: 0
      }
    },
  },

  mutations: {
    [EQUIPMENT_MODULE.SET_EQUIPMENTS](state, payload) {
      state.equipments = payload;
    },
    [EQUIPMENT_MODULE.SET_EQUIPMENT_TYPES](state, payload) {
      state.equipmentTypes = payload;
    },
    [EQUIPMENT_MODULE.SET_EQUIPMENT](state, payload) {
      state.equipment = payload;
    },
    [EQUIPMENT_MODULE.SET_PUT_EQUIPMENT_DATA](state, payload) {
      state.equipmentPut = payload;
    },
  },

  actions: {
    async [EQUIPMENT_MODULE.FETCH_EQUIPMENT_DATA]({commit}, data) {
      return apiLoader(async () => {
        const res = await api.get('equipment', {
          params: data
        })
        commit(EQUIPMENT_MODULE.SET_EQUIPMENTS, res.data)
      })
    },
    async [EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_DATA]({commit}, data) {
      return apiLoader(async () => {
        const res = await api.get('equipment_types', {
          params: data
        })
        commit(EQUIPMENT_MODULE.SET_EQUIPMENT_TYPES, res.data)
      })
    },
    async [EQUIPMENT_MODULE.POST_EQUIPMENT_DATA]({commit}, data) {
      return apiLoader(async () => {
        await api.post('equipment', data)
      })
    },
    async [EQUIPMENT_MODULE.SHOW_EQUIPMENT_DATA]({commit}, data) {
      return apiLoader(async () => {
        const res = await api.get(`equipment/${data}`)
        commit(EQUIPMENT_MODULE.SET_EQUIPMENT, res.data)
      })
    },
    async [EQUIPMENT_MODULE.PUT_EQUIPMENT_DATA]({commit}, {id, data}) {
      return apiLoader(async () => {
        const res = await api.put(`equipment/${id}`, data)
        commit(EQUIPMENT_MODULE.SET_PUT_EQUIPMENT_DATA, res.data)
      })
    },
    async [EQUIPMENT_MODULE.DELETE_EQUIPMENT_DATA]({commit}, id) {
      return apiLoader(async () => {
        await api.delete(`equipment/${id}`)
      })
    },
  },

  getters: {
    [EQUIPMENT_MODULE.GET_EQUIPMENTS](state) {
      return state.equipments
    },
    [EQUIPMENT_MODULE.GET_EQUIPMENT](state) {
      return state.equipment
    },
    [EQUIPMENT_MODULE.GET_PUT_EQUIPMENT_DATA](state) {
      return state.equipmentPut
    },
    [EQUIPMENT_MODULE.GET_EQUIPMENT_TYPES](state) {
      return state.equipmentTypes
    },
  }
}