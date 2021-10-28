import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (blogId) => {
  const url = `${baseUrl}/${blogId}`
  const blog = await (await axios.get(url)).data

  const response = await axios.put(url, { likes: blog.likes + 1 })
  return response.data
}

export default {
  setToken, getAll, create, like,
}
