import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import blogsRouter from './controllers/blogs'
import { DB_URI } from './utils/config'
import logger from './utils/logger'
import { errorHandler, requestLogger, unknownEndpoint } from './utils/middleware'

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
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
