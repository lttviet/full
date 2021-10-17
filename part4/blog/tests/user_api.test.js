import { hash } from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { initialUsers, usersInDb } from './test_helper'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const usersPromiseArray = initialUsers.map(async (u) => ({
    ...u,
    passwordHash: await hash(u.password, 10),
  }))
  const users = await Promise.all(usersPromiseArray)

  const promiseArray = users.map((u) => new User(u).save())
  await Promise.all(promiseArray)
})

describe('viewing all users', () => {
  test('returns json', async () => {
    const usersAtStart = await usersInDb()

    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.body).toHaveLength(usersAtStart.length)
  })
})

describe('addition of a new user', () => {
  test('succeeds with valid parameters', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'anotherUser',
      name: 'Another User',
      password: '12345678',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const users = usersAtEnd.map((u) => ({
      username: u.username,
      name: u.name,
    }))
    expect(users).toContainEqual({
      username: newUser.username,
      name: newUser.name,
    })
  })

  test('succeeds and returns a json without passwordHash', async () => {
    const newUser = {
      username: 'anotherUser',
      name: 'Another User',
      password: '12345678',
    }

    const returnedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { username, name, passwordHash } = returnedUser.body

    expect(username).toEqual(newUser.username)
    expect(name).toEqual(newUser.name)
    expect(passwordHash).not.toBeDefined()
  })

  test('fails if username is already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Root',
      password: '12345678',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails if username is missing', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      name: '12',
      password: '12345678',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails if username length is less than 3', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: '1',
      name: '1',
      password: '12345678',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      `\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length`,
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails if password is missing', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: '1111',
      name: '1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails if password length is less than 3', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: '1111',
      name: '1',
      password: '22',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
