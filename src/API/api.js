import Axios from 'axios';
import LocalStorageService from ".././helpers/LocalStorageService"; 


const localStorageService = LocalStorageService.getService();

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

const UserInstance = Axios.create({
  baseURL: BACKEND_BASE_URL + '/api/users'
});

const TokenInstance = Axios.create({
  baseURL: BACKEND_BASE_URL + '/api/users'
});

UserInstance.interceptors.request.use(
  config => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
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
    return TokenInstance.post('/token',
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
  else if(error.response.status === 205){
    localStorageService.clearToken()
    window.location.href="/app"
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

export const Logout = async() => {
  const {data} = await UserInstance.post('/logout', {
    "refreshToken": localStorageService.getRefreshToken()
  })
  if(data){
    localStorageService.clearToken()
    window.location.href="/app"
  }
}