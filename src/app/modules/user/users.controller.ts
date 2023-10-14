import { Request, Response } from 'express'
import { createUserService } from './users.services'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createUserService(user)
    res.status(201).json({
      statusCode: res.statusCode,
      request: true,
      message: 'Success',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      statusCode: res.statusCode,
      request: false,
      message: 'Failed',
      data: null,
    })
  }
}
