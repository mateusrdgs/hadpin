import IControllers from '../contracts/controllers'
import IServices from '../contracts/services'

import Health from './health'

class Controllers implements IControllers {
  health: Health

  constructor(services: IServices) {
    this.health = new Health(services.health)
  }
}

export default Controllers
