import express from 'express'

import IRouter from 'contracts/router'

import HealthRouter from 'routes/health'
import Controllers from 'controllers'

class Router implements IRouter {
  routes: express.Router

  constructor(controllers: Controllers) {
    this.routes = express.Router()

    const health = new HealthRouter(express.Router(), controllers.health)

    this.routes.use('/health', health.router)
  }
}

export default Router
