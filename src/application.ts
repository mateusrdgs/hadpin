import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const IS_PROD = process.env.NODE_ENV === 'prod'
const LOGGER_FORMAT = IS_PROD ? 'combined' : 'dev'

const logger = () => morgan(LOGGER_FORMAT)

class Application {
  public application: express.Application

  constructor(routes: express.Router) {
    this.application = express()

    this.application.use(helmet())
    this.application.use(logger())

    this.application.use('/api', routes)
  }
}

export default Application
