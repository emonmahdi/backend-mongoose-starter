import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await UserServices.createUserIntoDB(userData)

    res.status(200).json({
      success: true,
      message: 'User create Successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create User',
      error: error,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersIntoDB()

    res.status(200).json({
      success: false,
      message: 'Users retrieved Successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create User',
      error: error,
    })
  }
}


const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(Number(userId))

    if (!result) {
      res.status(404).json({
        success: true,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Retrieved single user successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create User',
      error: error,
    })
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
}
