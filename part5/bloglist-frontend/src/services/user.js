import axios from 'axios'

const baseLoginUrl = '/api/login'
const baseUserUrl = '/api/users'

const login = async (credentials) => {
  const response = await axios.post(baseLoginUrl, credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUserUrl)
  return response.data
}

export default { login, getAll }
