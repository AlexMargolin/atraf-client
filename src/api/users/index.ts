import { ResponseStatic } from "@/api"

export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  profile_picture: string
  created_at: string
}

// Users returned from the API are always in an array form
// Usually we would want to create a userId -> User map
export type MappedUsers = Record<User["id"], User>

export type UserFields = {
  email: string
  first_name: string
  last_name: string
  profile_picture: string
}

export type ReadOneResponse = {
  user: User
}
export type ReadOneFunc = (
  userId: string,
) => Promise<[ReadOneResponse, ResponseStatic]>
