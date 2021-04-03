import express from 'express'

import IRouter from '../contracts/router'

import HealthRouter from './health'
import Controllers from '../controllers'

class Router implements IRouter {
  routes: express.Router

  constructor(controllers: Controllers) {
    this.routes = express.Router()

    const health = new HealthRouter(this.routes, controllers.health)

    this.routes.use('/health', health.router)

    this.routes.use('*', this.handleNotFound)
  }

  private handleNotFound(_: express.Request, res: express.Response): void {
    res.status(404).send('Not found')
  }
}

export default Router
