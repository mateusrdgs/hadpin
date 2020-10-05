import Health from './health'

class Controllers {
  health: Health

  constructor() {
    this.health = new Health()
  }
}

export default Controllers
