import axios from 'axios';
import {ALERT_MODULE} from '@/stores/const'
import store from "@/stores";

const token = () => localStorage.getItem('token');
const authHeader = token() ? { Authorization: 'Bearer ' + token() } : {}
const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    ...authHeader
  }
})

const apiLoader = async (action) => {
  try {
    await action()
    return true
  } catch (error) {
    if(error.response?.status === 401) {
      localStorage.removeItem('token')
      location.href = 'login'
    }
    if(error.response?.data) {
      store.dispatch(ALERT_MODULE.ADD_ALERT, {
        id: Date.now(),
        message: error.response.data.message,
        type: 'alert-danger'
      })
    }
  }
}

export {api, apiLoader}