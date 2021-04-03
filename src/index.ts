import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'

import HealthService from './services/health'
import Service from './services'

import Controllers from './controllers'
import Router from './routes'
import Application from './application'
import Server from './server'

dotenv.config()

const PORT = process.env.PORT || 3000
const IS_PROD = process.env.NODE_ENV === 'prod'

if (IS_PROD && cluster.isMaster) {
  const cpuCount = os.cpus().length
  for (let i = 0; i <= cpuCount; i++) {
    cluster.fork()
  }
} else {
  const healthService = new HealthService()

  const services = new Service(healthService)
  const controllers = new Controllers(services)
  const router = new Router(controllers)
  const application = new Application(router)
  const server = new Server(application)

  server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
  })
}
