/* eslint-disable no-underscore-dangle */
import express from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog'
import User from '../models/user'
import { SECRET } from '../utils/config'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('author', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('author', { username: 1, name: 1 })
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const { title, url, likes } = request.body

  const blog = new Blog({
    title,
    url,
    likes,
    author: user._id,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
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
  const decodedToken = jwt.verify(request.token, SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.author.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  blog.delete()
  return response.status(204).end()
})

export default blogsRouter
