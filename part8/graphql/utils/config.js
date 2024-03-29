import { config } from 'dotenv'

config()

const { PORT, NODE_ENV, JWT_SECRET } = process.env

const DB_URI = NODE_ENV === 'test'
  ? process.env.TEST_DB_URI
  : process.env.DB_URI

export {
  PORT, DB_URI, JWT_SECRET, NODE_ENV,
}
