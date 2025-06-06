import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  add: add,
  update: update,
  del: del
}
/*
export default { getAll, add, update, del }
*/