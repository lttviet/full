import axios from 'axios'

const API_BASE_URL = '/api/persons'

const getAll = async () => {
  const res = await axios.get(API_BASE_URL)
  return res.data
}

const create = async (newPerson) => {
  const res = await axios.post(API_BASE_URL, newPerson)
  return res.data
}

const deletePerson = (id) => axios.delete(`${API_BASE_URL}/${id}`)

const update = async (id, newPerson) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, newPerson)
  return res.data
}

const methods = {
  getAll, create, deletePerson, update,
}
export default methods
