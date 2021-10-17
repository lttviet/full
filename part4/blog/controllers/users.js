import { hash } from 'bcrypt'
import express from 'express'
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 8) {
    return response
      .status(400)
      .json({
        error: 'Password must be at least 8 characters.',
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
