import http from 'http'
import https from 'https'

import IServer from './contracts/server'
import IApplication from './contracts/application'

class Server implements IServer {
  private server: http.Server | https.Server

  constructor(application: IApplication) {
    this.server = http.createServer(application.application)
  }

  listen(
    port: string | number,
    callback: () => void
  ): http.Server | https.Server {
    return this.server.listen(port, callback)
  }
}

export default Server
