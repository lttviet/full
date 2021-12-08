/* eslint-disable no-underscore-dangle */
import express from 'express'
import Blog from '../models/blog'
import { userExtractor } from '../utils/middleware'

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { user } = request
  const { title, url, likes } = request.body

  const blog = new Blog({
    title,
    url,
    likes,
    author: user._id,
  })
  const savedBlog = await blog.save()
  await savedBlog.populate('author', { username: 1, name: 1 })

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
    .populate('author', { username: 1, name: 1 })

  if (returnedBlog) {
    response.json(returnedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'not found' })
  }

  if (blog.author.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString())
  await user.save()

  await blog.delete()

  return response.status(204).end()
})

export default blogsRouter
