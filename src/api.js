import axios from 'axios';
import Axios from 'axios';
import LocalStorageService from "./helpers/LocalStorageService"; 


const localStorageService = LocalStorageService.getService();

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

const UserInstance = Axios.create({
  baseURL: BACKEND_BASE_URL + '/api/users'
});

UserInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
  return config;
});

UserInstance.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
},
  error => {
    Promise.reject(error)
});

UserInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const originalRequest = error.config;
  if(error.response.status === 401){
    return axios.post('http://localhost:3000/api/users/token',
    {
      "refreshToken": localStorageService.getRefreshToken()
    })
    .then(async(res) => {
      if (res.status === 200) {
        localStorageService.setToken(res.data)
        UserInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
        return UserInstance(originalRequest);
      }
    })
  }
  else{
    localStorageService.clearToken()
    window.location.href = "/app"
  }
  return Promise.reject(error.response);
})

export const createUser = async(req) => {
  const {data} = await UserInstance.post('/add-user', req)
  return data
}

export const checkUser = async(req) => {
  const {data} = await UserInstance.post('/check-user', req)
  return data
}

export const authenticate = async(req) => {
  const {data} = await UserInstance.post(`/authenticate`, req)
  return data
}

export const test = async() => {
  const data = await UserInstance.get('/user')
}