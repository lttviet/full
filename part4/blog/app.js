import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import blogsRouter from './controllers/blogs'
import loginRouter from './controllers/login'
import usersRouter from './controllers/users'
import testRouter from './controllers/testing'
import { DB_URI, NODE_ENV } from './utils/config'
import logger from './utils/logger'
import {
  errorHandler,
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
} from './utils/middleware'

logger.info('connecting to', DB_URI)

mongoose.connect(DB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (NODE_ENV === 'test') {
  app.use('/api/tests', testRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
