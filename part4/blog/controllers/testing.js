import express from 'express'
import User from '../models/user'
import Blog from '../models/blog'

const testRouter = express.Router()

testRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

export default testRouter
