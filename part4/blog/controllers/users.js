import { hash } from 'bcrypt'
import express from 'express'
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response
      .status(400)
      .json({
        error: 'password is required.',
      })
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({
        error: 'password must be at least 3 characters.',
      })
  }

  const foundUsername = await User.findOne({ username })
  if (foundUsername) {
    return response
      .status(400)
      .json({
        error: 'username must be unique.',
      })
  }

  const saltRound = 10
  const passwordHash = await hash(password, saltRound)

  const user = User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  return response.json(savedUser)
})

export default usersRouter
