import mysql from 'mysql'

interface IMySQLPoolConfig {
  connectionLimit: number | undefined
  host: string | undefined
  port: number | undefined
  user: string | undefined
  password: string | undefined
  name: string | undefined
}
interface IMySQL {
  query<T>(query: mysql.Query): Promise<mysql.MysqlError | T[]>
  transaction<T>(options: mysql.QueryOptions): Promise<mysql.MysqlError | T[]>
}

export { IMySQL, IMySQLPoolConfig }
