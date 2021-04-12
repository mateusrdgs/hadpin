import express from 'express'
import HealthController from 'controllers/health'

class HealthRouter {
  private controller: HealthController
  public router: express.Router

  constructor(router: express.Router, controller: HealthController) {
    this.controller = controller
    this.router = router

    this.router.get('/', this.controller.handleUptime)
  }
}

export default HealthRouter
