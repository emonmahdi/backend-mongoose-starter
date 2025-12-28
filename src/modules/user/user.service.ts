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

export const UserServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserFromDB,
  updateUserIntoDB,
}
