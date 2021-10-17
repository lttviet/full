import { hash } from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { usersInDb } from './test_helper'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await hash('abcSecret123', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })
  await user.save()
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
})

afterAll(() => {
  mongoose.connection.close()
})
