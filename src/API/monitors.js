import Axios from 'axios';
import LocalStorageService from ".././helpers/LocalStorageService"; 


const localStorageService = LocalStorageService.getService();

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

const MonitorInstance = Axios.create({
  baseURL: BACKEND_BASE_URL + '/api/monitor'
})

MonitorInstance.interceptors.request.use(
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

MonitorInstance.interceptors.response.use(function (response) {
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
        MonitorInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
        return UserInstance(originalRequest);
      }
    })
  }
  else if(error.response.status === 205){
    localStorageService.clearToken()
    window.location.href="/app"
  }
  else{
    localStorageService.clearToken()
    window.location.href="/app"
  }
  return Promise.reject(error.response);
})

export const addMonitor = async(req) => {
  const {data} = await MonitorInstance.post("/url-monitor-add", req);
  return data
}

export const listMonitors = async(req) => {
  const {data} = await MonitorInstance.post("/list-monitors", req);
  return data
}

export const deleteMonitor = async(id) => {
  const {data} = await MonitorInstance.delete(`/delete-monitor/${id}`)
  return data
}

export const activateMonitor = async(id, status) => {
  const {data} = await MonitorInstance.post(`/activate-job/${id}`, {status: status})
  return data
}

export const getLogs = async(id) => {
  const {data} = await MonitorInstance.get(`/get-logs/${id}`)
  return data
}

export const getMonitor = async(id) => {
  const {data} = await MonitorInstance.get(`/get-monitor/${id}`)
  return data
}