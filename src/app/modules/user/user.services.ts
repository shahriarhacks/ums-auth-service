import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import User from './user.model'
import { generatedUserId } from './user.utils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  const id = await generatedUserId()
  user.id = id

  if (!user.password) {
    user.password = config.DEF_PASS as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(404, 'Failed to create an user')
  }
  return createdUser
}
