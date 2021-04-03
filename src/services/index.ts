import IServices from 'contracts/services'
import IHealthService from 'contracts/services/health'

class Services implements IServices {
  health: IHealthService

  constructor(health: IHealthService) {
    this.health = health
  }
}

export default Services
