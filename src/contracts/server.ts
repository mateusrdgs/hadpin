import http from 'http'
import https from 'https'

export default interface IServer {
  listen(
    port: string | number,
    callback: () => void
  ): http.Server | https.Server
}
