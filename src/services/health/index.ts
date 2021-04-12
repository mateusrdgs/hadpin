import IService from 'contracts/services/health'

class Service implements IService {
  handleUptime(): number {
    return process.uptime()
  }
}

export default Service
