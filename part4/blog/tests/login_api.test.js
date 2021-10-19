import { hash } from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { initialUsers } from './test_helper'

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

describe('login', () => {
  test('succeeds if username and password are correct', async () => {
    const userToLogin = {
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    }

    const result = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.username).toEqual(userToLogin.username)
    expect(result.body.token).toBeDefined()
  })

  test('fails with 401 if password is wrong', async () => {
    const userToLogin = {
      username: initialUsers[0].username,
      password: '',
    }

    await api
      .post('/api/login')
      .send(userToLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
