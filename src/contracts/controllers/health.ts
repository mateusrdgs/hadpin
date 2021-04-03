import express from 'express'

import IService from '../services/health'

interface IController {
  service: IService
  handleUptime(req: express.Request, res: express.Response): void
}

export default IController
