import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {EQUIPMENT_MODULE} from '../const'
import {api, apiLoader} from "../../api";

const initialState = {
  equipmentIsLoading: false,
  equipment: {},

  equipmentsIsLoading: false,
  equipments: {
    data: [],
    meta: {
      page: 1,
      per_page: 15,
      current_page: 1,
      last_page: 0,
      total: 0,
      to: 0
    }
  },

  equipmentTypesIsLoading: false,
  equipmentTypes: {
    data: [],
    meta: {
      page: 1,
      per_page: 15,
      current_page: 1,
      last_page: 0,
      total: 0,
      to: 0
    }
  },
};

const asyncFetchEquipments = createAsyncThunk(EQUIPMENT_MODULE.FETCH_EQUIPMENT_LIST, async (data) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.get('equipment', {
      params: data
    })
  })
  return resp.data
})

const asyncPostEquipments = createAsyncThunk(EQUIPMENT_MODULE.POST_EQUIPMENT_LIST, async (data) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.post('equipment', data)
  })
  return resp.data
})

const asyncFetchEquipmentTypes = createAsyncThunk(EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_LIST, async (data) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.get('equipment_types', data)
  })
  return resp.data
})

const asyncFetchEquipment = createAsyncThunk(EQUIPMENT_MODULE.FETCH_EQUIPMENT, async (data) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.get(`equipment/${data}`)
  })
  return resp.data
})

const asyncPutEquipment = createAsyncThunk(EQUIPMENT_MODULE.PUT_EQUIPMENT, async (data) => {
  const {id, form} = data
  let resp = {};
  await apiLoader(async () => {
    resp = await api.put(`equipment/${id}`, form)
  })
  return resp.data
})

const asyncDeleteEquipment = createAsyncThunk(EQUIPMENT_MODULE.DELETE_EQUIPMENT, async (id) => {
  let resp = {};
  await apiLoader(async () => {
    resp = await api.delete(`equipment/${id}`)
  })
  return resp.data
})

const slice = createSlice({
  name: EQUIPMENT_MODULE.NAME,
  initialState,

  reducers: {
  },
  extraReducers: (builder) => {
    builder
        //устройства
        .addCase(asyncFetchEquipments.pending, (state) => {
          state.equipmentsIsLoading = true;
        })
        .addCase(asyncFetchEquipments.fulfilled, (state, action) => {
          state.equipmentsIsLoading = false;
          if(action.payload) {
            state.equipments = action.payload
          }
        })
        //
        .addCase(asyncFetchEquipmentTypes.pending, state => {
          state.equipmentTypesIsLoading = true
        })
        .addCase(asyncFetchEquipmentTypes.fulfilled, (state, action) => {
          state.equipmentTypesIsLoading = false;
          if(action.payload) {
            state.equipmentTypes = action.payload
          }
        })
        //
        .addCase(asyncPostEquipments.pending, (state, action) => {
          state.equipmentIsLoading = true
        })
        .addCase(asyncPostEquipments.fulfilled, (state, action) => {
          state.equipmentIsLoading = false
          if(action.payload) {
            state.equipment = action.payload
          }
        })
        //
        .addCase(asyncFetchEquipment.pending, (state, action) => {
          state.equipmentIsLoading = true
        })
        .addCase(asyncFetchEquipment.fulfilled, (state, action) => {
          state.equipmentIsLoading = false
          if(action.payload) {
            state.equipment = action.payload
          }
        })
        //
        .addCase(asyncPutEquipment.pending, (state, action) => {
          state.equipmentIsLoading = true
        })
        .addCase(asyncPutEquipment.fulfilled, (state, action) => {
          state.equipmentIsLoading = false
        })
        //
        .addCase(asyncDeleteEquipment.pending, (state, action) => {
          state.equipmentIsLoading = true
        })
        .addCase(asyncDeleteEquipment.fulfilled, (state, action) => {
          state.equipmentIsLoading = false
        })
  },
});

const equipmentSlice = {
  name: EQUIPMENT_MODULE.NAME,
  actions: {
    ...slice.actions,
    [EQUIPMENT_MODULE.FETCH_EQUIPMENT_LIST]: asyncFetchEquipments,
    [EQUIPMENT_MODULE.FETCH_EQUIPMENT]: asyncFetchEquipment,
    [EQUIPMENT_MODULE.PUT_EQUIPMENT]: asyncPutEquipment,
    [EQUIPMENT_MODULE.POST_EQUIPMENT_LIST]: asyncPostEquipments,
    [EQUIPMENT_MODULE.DELETE_EQUIPMENT]: asyncDeleteEquipment,
    [EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_LIST]: asyncFetchEquipmentTypes,
  },
  reducer: slice.reducer,
  states: {
    [EQUIPMENT_MODULE.GET_EQUIPMENT_STATE]: (state) => state[EQUIPMENT_MODULE.NAME],
  }
}

export default equipmentSlice
