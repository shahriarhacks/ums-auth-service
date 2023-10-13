import config from '../../../config'
import { IUser } from './users.interface'
import User from './users.model'
import { generatedUserId } from './users.utils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generatedUserId()
  user.id = id

  if (!user.password) {
    user.password = config.DEF_PASS as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create an user')
  }
  return createdUser
}
