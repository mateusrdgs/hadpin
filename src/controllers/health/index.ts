import express from 'express'
import IService from '../../contracts/services/health'
import IControler from '../../contracts/controllers/health'

class Controller implements IControler {
  service: IService

  constructor(service: IService) {
    this.service = service
  }

  handleUptime = (req: express.Request, res: express.Response): void => {
    res.status(200).send(this.service.handleUptime().toString())
  }
}

export default Controller
