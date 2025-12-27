import { UserInterface } from './user.interface'
import { UserModel } from './user.model'

const createUserIntoDB = async (user: UserInterface) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersIntoDB = async () => {
  const result = await UserModel.find()
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
}
