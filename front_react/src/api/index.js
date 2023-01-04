import axios from "axios";
import {store} from '../store';
import {ALERT_MODULE} from "../store/const";
import {actions} from "../store/slices"

const token = () => localStorage.getItem('token');
const authHeader = token() ? {Authorization: 'Bearer ' + token()} : {}


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'localhost',
  headers: {
    Accept: "application/json",
    ...authHeader
  }
})

const findErrorText = object => {
  if (typeof object == "string") return object;
  for(const i in object) {
    if(object[i] !== null && typeof object[i] === 'object') {
      return findErrorText(object[i])
    } else if(typeof object[i] === 'string') {
      return object[i]
    }
  }
  return null
}


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
        message: findErrorText(error.response.data),
        type: 'alert-danger'
      }))
    }
  }
}

export {
  api,
  apiLoader
}