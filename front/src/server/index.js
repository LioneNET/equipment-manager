import axios from 'axios';

const api = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const authHeader = token ? { Authorization: 'Bearer ' + token.accessToken } : {}
  const API_URL = 'http://testovoe.loc/api';
  const $api = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
      ...authHeader
    }
  })
  $api.interceptors.response.use(res=>{
    return res
  }, err=> {
    if(err?.response['status'] === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(err)
  })
  return $api
}

export default api