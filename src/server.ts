import http from 'http'
import https from 'https'

class Server {
  private server: http.Server | https.Server

  constructor(application: Express.Application) {
    this.server = http.createServer(application)
  }

  listen(
    port: string | number,
    callback: () => void
  ): http.Server | https.Server {
    return this.server.listen(port, callback)
  }
}

export default Server
