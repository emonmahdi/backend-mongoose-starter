/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject  } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validateRequest =
  (schema: ZodObject ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
      })
      next()
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: {
          code: 400,
          description: error.errors,
        },
      })
    }
  }

export default validateRequest
