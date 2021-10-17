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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

export {
  initialBlog, blogsInDb, usersInDb,
}
