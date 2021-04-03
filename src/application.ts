import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import IRouter from './contracts/router'
import IApplication from './contracts/application'

const IS_PROD = process.env.NODE_ENV === 'prod'
const LOGGER_FORMAT = IS_PROD ? 'combined' : 'dev'

const logger = () => morgan(LOGGER_FORMAT)

class Application implements IApplication {
  public application: express.Application

  constructor(router: IRouter) {
    this.application = express()

    this.application.use(helmet())
    this.application.use(logger())
    this.application.use(express.json())

    this.application.use('/api', router.routes)
  }
}

export default Application
