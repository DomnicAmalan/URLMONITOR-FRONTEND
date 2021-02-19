import Axios from 'axios';

const UserInstance = Axios.create({
  baseURL: 'http://localhost:3000/users/',
});

export const createUser = async(data) => {
  const resp = await UserInstance.post('/add-user', data)
  return resp
}

export const checkUser = async(data) => {
  const resp = await Axios.post('http://localhost:3000/users/check-user', data)
  console.log(resp)
  return resp
}

export const authenticate = async(data) => {
  const resp = await UserInstance.post(`/authenticate`, data)
}