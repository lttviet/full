import express from 'express'
import Blog from '../models/blog'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
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
