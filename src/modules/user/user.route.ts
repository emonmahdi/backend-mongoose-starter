import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { addOrderSchema, createUserSchema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(createUserSchema),
  UserController.createUser
)
router.get('/', UserController.getAllUsers)
router.get('/:userId', UserController.getSingleUser)
router.put(
  '/:userId',
  validateRequest(addOrderSchema),
  UserController.updateUser
)
router.delete('/:userId', UserController.deleteUser)
router.put('/:userId/orders', UserController.addOrder)
router.get('/:userId/orders', UserController.getOrders)
router.get('/:userId/orders/total-price', UserController.getTotalOrderPrice)

export const userRoutes = router
