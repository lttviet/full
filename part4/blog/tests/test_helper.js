import Blog from '../models/blog'
import User from '../models/user'

const initialBlog = [
  {
    title: 'First post',
    author: 'First athour',
    url: '/first-post',
    likes: 100,
  },
  {
    title: 'Second post',
    author: 'Second athour',
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
    username: '2',
    name: '2',
    password: 'superSecret22222',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

export {
  initialBlog, initialUsers, blogsInDb, usersInDb,
}
