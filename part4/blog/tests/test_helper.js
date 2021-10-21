import Blog from '../models/blog'
import User from '../models/user'

const initialBlog = [
  {
    title: 'First post',
    url: '/first-post',
    likes: 100,
  },
  {
    title: 'Second post',
    url: '/second-post',
    likes: 24,
  },
]

const initialUsers = [
  {
    username: 'root',
    name: 'root',
    password: 'superSecret1111',
  },
  {
    username: 'secondUser',
    name: 'secondName',
    password: 'superSecret22222',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1 })
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

export {
  initialBlog, initialUsers, blogsInDb, usersInDb,
}
