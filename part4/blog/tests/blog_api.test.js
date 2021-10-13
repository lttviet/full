import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import { initialBlog } from './test_helper'
import Blog from '../models/blog'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObj = initialBlog.map((b) => new Blog(b))
  const promiseArray = blogObj.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlog.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const blog = response.body.map(({
    title, author, url, likes,
  }) => ({
    title, author, url, likes,
  }))

  expect(blog).toContainEqual(initialBlog[0])
})

afterAll(() => {
  mongoose.connection.close()
})
