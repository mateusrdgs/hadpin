import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

import IRouter from 'contracts/router'
import IApplication from 'contracts/application'

const IS_DEV = process.env.NODE_ENV === 'development'
const LOGGER_FORMAT = IS_DEV ? 'dev' : 'combined'

const logger = () => morgan(LOGGER_FORMAT)

class Application implements IApplication {
  public application: express.Application

  constructor(router: IRouter) {
    this.application = express()

    this.application.use(helmet())
    this.application.use(logger())
    this.application.use(compression())
    this.application.use(express.json())

    this.application.use('/api', router.routes)

    this.application.use('*', this.handleNotFound)
  }

  private handleNotFound(_: express.Request, res: express.Response): void {
    res.status(404).send('Not found')
  }
}

export default Application
