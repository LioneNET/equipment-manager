import axios from "axios";
import {store} from '../store';
import {ALERT_MODULE} from "../store/const";
import {actions} from "../store/slices"

const token = () => localStorage.getItem('token');
const authHeader = token() ? {Authorization: 'Bearer ' + token()} : {}


const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = 'login'
    }
    if (error.response?.data) {
      store.dispatch(actions[ALERT_MODULE.ALERT_ADD_ACTION]({
        id: Date.now(),
        duration: 3000,
        message: error.response.data.message,
        type: 'alert-danger'
      }))
    }
  }
}

export {
  api,
  apiLoader
}