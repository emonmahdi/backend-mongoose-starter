import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/create-user', UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:userId', UserController.getSingleUser)
router.put('/:userId', UserController.updateUser)
router.delete('/:userId', UserController.deleteUser)
router.put('/:userId/orders', UserController.addOrder)
router.get('/:userId/orders', UserController.getOrders)

export const userRoutes = router
