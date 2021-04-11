import mysql from 'mysql'

import { IMySQL, IMySQLPoolConfig } from 'contracts/database/mysql'

class MySQL implements IMySQL {
  private pool: mysql.Pool | undefined

  constructor() {
    this.pool = this.createPool()
    this.gracefulShutdown()
  }

  private getConfig(): IMySQLPoolConfig {
    return {
      connectionLimit: (process.env.DB_CONNECTION_LIMIT as unknown) as number,
      host: (process.env.DB_HOST as unknown) as string,
      port: (process.env.DB_PORT as unknown) as number,
      user: (process.env.DB_USER as unknown) as string,
      password: (process.env.DB_CONNECTION_LIMIT as unknown) as string,
      name: (process.env.DB_CONNECTION_LIMIT as unknown) as string,
    }
  }

  private createPool(): mysql.Pool {
    const config = this.getConfig()

    return mysql.createPool(config)
  }

  public query<T>(query: mysql.Query): Promise<mysql.MysqlError | T[]> {
    return new Promise((resolve, reject) => {
      return this.pool?.query(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  public transaction<T>(
    options: mysql.QueryOptions
  ): Promise<mysql.MysqlError | T[]> {
    return new Promise((resolve, reject) => {
      return this.pool?.getConnection(
        (err: mysql.MysqlError, connection: mysql.PoolConnection) => {
          if (err) {
            reject(err)
          } else {
            connection.beginTransaction(options, (err: mysql.MysqlError) => {
              if (err) {
                reject(err)
              } else {
                connection.query(options, (err: mysql.MysqlError, rows: []) => {
                  if (err) {
                    connection.rollback(options, (err: mysql.MysqlError) => {
                      if (err) {
                        reject(err)
                      } else {
                        reject(err)
                      }
                    })
                  } else {
                    connection.commit(options, (err: mysql.MysqlError) => {
                      if (err) {
                        reject(err)
                      } else {
                        connection.release()
                        resolve(rows)
                      }
                    })
                  }
                })
              }
            })
          }
        }
      )
    })
  }

  private shutdown(reason: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('MySQL disconnected through' + reason)

      this.pool?.end((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  private gracefulShutdown(): void {
    process.once('SIGUSR2', () => {
      this.shutdown('Nodemon restart').then(() =>
        process.kill(process.pid, 'SIGURS2')
      )
    })

    process.on('SIGINT', () => {
      this.shutdown('Termination').then(() =>
        process.kill(process.pid, 'SIGINT')
      )
    })

    process.on('SIGTERM', () => {
      this.shutdown('Cloud shutdown').then(() =>
        process.kill(process.pid, 'SIGTERM')
      )
    })
  }
}

export default MySQL
