import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/create-user', UserController.createUser)
router.get('/', UserController.getAllUsers)

export const userRoutes = router
