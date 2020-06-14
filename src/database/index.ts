import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const DB_CONNECTION_LIMIT = (process.env
  .DB_CONNECTION_LIMIT as unknown) as number
const DB_HOST = process.env.DB_HOST
const DB_PORT = (process.env.DB_PORT as unknown) as number
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const pool = mysql.createPool({
  connectionLimit: DB_CONNECTION_LIMIT,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

export default pool
