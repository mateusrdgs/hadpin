import IService from 'contracts/services/health'

class Service implements IService {
  handleUptime(): number {
    return process.uptime() * 100
  }
}

export default Service
