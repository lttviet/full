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

describe('when there is initially some blogs saved', () => {
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
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
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

  test('defaults likes to 0', async () => {
    const newBlog = {
      author: 'New',
      title: 'Super new',
      url: '/new/123',
    }

    const resultBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.likes).toEqual(0)
  })

  test('fails with 400 with no title and url', async () => {
    const newBlog = {
      author: 'Me',
      likes: 100,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })

  test('fails with a misformatted id', async () => {
    await api
      .delete('/api/blogs/abc')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('update of a blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLike = { likes: 7 }

    const returnedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newLike)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(returnedBlog.body.likes).toEqual(newLike.likes)
  })

  test('fails with 404 for an invalid id', async () => {
    await api
      .put('/api/blogs/111111111111111111111111')
      .send({ likes: 123 })
      .expect(404)
  })

  test('fails with 400 for a misformatted id', async () => {
    await api
      .put('/api/blogs/123')
      .send({ likes: 123 })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
