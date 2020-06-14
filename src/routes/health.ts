import express from 'express'
import controller from '../controllers/health'

const router = express.Router()

router.use('/health', controller.health)

export default router
