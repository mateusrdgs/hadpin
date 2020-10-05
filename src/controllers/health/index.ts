import express from 'express'

class Health {
  handleUptime(_: express.Request, res: express.Response): void {
    res.send(`${process.uptime()}`)
  }
}

export default Health
