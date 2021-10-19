/* eslint-disable no-underscore-dangle */
import { compare } from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { SECRET } from '../utils/config'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const correctPassword = !user
    ? false
    : await compare(password, user.passwordHash)

  if (!user || !correctPassword) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const token = jwt.sign(
    { username, id: user._id },
    SECRET,
    { expiresIn: 60 * 60 },
  )

  return response
    .status(200)
    .json({ token, username })
})

export default loginRouter
