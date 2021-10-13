import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import { blogsInDb, initialBlog } from './test_helper'
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

test('blog has id property', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be added', async () => {
  const newBlog = {
    author: 'New',
    title: 'Super new',
    url: '/new/123',
    likes: 0,
  }

  const resultBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.author).toEqual(newBlog.author)
  expect(resultBlog.body.title).toEqual(newBlog.title)
  expect(resultBlog.body.url).toEqual(newBlog.url)

  const allBlogs = await api.get('/api/blogs')
  expect(allBlogs.body).toHaveLength(initialBlog.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
