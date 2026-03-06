import { IUser, CreateUserDTO } from "@/types/user.types"
import { UserModel } from "@/models/user.model"

export const createUser = async (
  data: CreateUserDTO
): Promise<IUser> => {
  const user = await UserModel.create(data)
  return user
}

export const getUsers = async (): Promise<IUser[]> => {
  return UserModel.find().lean()
}