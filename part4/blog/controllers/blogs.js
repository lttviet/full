/* eslint-disable no-underscore-dangle */
import express from 'express'
import Blog from '../models/blog'
import User from '../models/user'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('author', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('author')
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne()

  const blog = new Blog({ ...request.body, author: user._id })
  const savedBlog = await blog.save()

  console.log(user)
  user.blogs = user.blogs.concat(savedBlog._id)
  console.log(user)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const {
    title, author, url, likes,
  } = request.body

  const blog = {
    title, author, url, likes,
  }

  const returnedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })

  if (returnedBlog) {
    response.json(returnedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default blogsRouter
