import { OrderInterface, UserInterface } from './user.interface'
import { UserModel } from './user.model'

const createUserIntoDB = async (user: UserInterface) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersIntoDB = async () => {
  const result = await UserModel.find()
  return result
}

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId })
  return result
}

// Update User
const updateUserIntoDB = async (
  userId: number,
  payload: Partial<UserInterface>
) => {
  const result = await UserModel.findOneAndUpdate({ userId }, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId })
  return result
}

//  Add order to user
const addOrderToUser = async (
  userId: number,
  order: OrderInterface
): Promise<void> => {
  const user = await UserModel.findOne({ userId })

  if (!user) {
    const error = new Error(`User with id ${userId} not found!`)
    error.name = 'NotFoundError'
    throw error
  }

  if (!user.orders) {
    user.orders = []
  }

  user.orders.push(order)
  await user.save()
}

const getOrdersByUserId = async (userId: number): Promise<OrderInterface[]> => {
  const user = await UserModel.findOne({ userId })

  if (!user) {
    const error = new Error(`User with id ${userId} not found`)
    error.name = 'NotFoundError'
    throw error
  }

  return user.orders || []
}



export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addOrderToUser,
  getOrdersByUserId,
}
