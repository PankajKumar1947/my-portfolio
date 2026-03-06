import { CreateUserDTO, IUser } from "@/types/user.types"
import * as userRepo from "@/repositories/user.repository"

export const createUserService = async (
  data: CreateUserDTO
): Promise<IUser> => {

  const existing = await userRepo.getUsers()

  const emailExists = existing.find(u => u.email === data.email)

  if (emailExists) {
    throw new Error("User already exists")
  }

  return userRepo.createUser(data)
}

export const getUsersService = async (): Promise<IUser[]> => {
  return userRepo.getUsers()
}