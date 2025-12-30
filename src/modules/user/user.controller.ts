/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await UserServices.createUserIntoDB(userData)

    //
    const { password, ...safeUser } = result.toObject()

    // delete to the response the password
    // delete userObject?.password

    res.status(200).json({
      success: true,
      message: 'User create Successfully',
      data: safeUser,
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

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const payload = req.body

    const result = await UserServices.updateUserIntoDB(Number(userId), payload)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'User Update Successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User Cannot Update Something went wrong',
      error,
    })
  }
}

// Delete User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(Number(userId))

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(500).json({
      success: false,
      message: 'User Delete Successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User Can not delete! Something wrong!!!',
      error,
    })
  }
}

const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const order = req.body

    await UserServices.addOrderToUser(Number(userId), order)

    res.status(200).json({
      success: true,
      message: 'Order created Successfully',
      data: null,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundError') {
      return res.status(404).json({
        success: false,
        message: error.message,
        data: null,
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to Order',
      data: null,
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const orders = await UserServices.getOrdersByUserId(Number(userId))

    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundError') {
      return res.status(404).json({
        success: false,
        message: error.message,
        data: null,
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      data: null,
    })
  }
}
const getTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const totalPrice = await UserServices.calculateTotalOrderPrice(
      Number(userId)
    )

    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'UserNotFoundError') {
      return res.status(404).json({
        success: false,
        message: error.message,
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate total price',
      data: null,
    })
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalOrderPrice,
}
