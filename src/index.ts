const IS_DEV = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 3000

import dotenv from 'dotenv'

if (IS_DEV) {
  dotenv.config()
}

import cluster from 'cluster'
import os from 'os'

import HealthService from './services/health'
import Services from './services'

import Controllers from './controllers'
import Router from './routes'
import Application from './application'
import Server from 'server'

if (!IS_DEV && cluster.isMaster) {
  const cpuCount = os.cpus().length

  for (let i = 0; i <= cpuCount; i++) {
    cluster.fork()
  }
} else {
  const healthService = new HealthService()

  const services = new Services(healthService)
  const controllers = new Controllers(services)
  const router = new Router(controllers)
  const application = new Application(router)
  const server = new Server(application)

  server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
  })
}
