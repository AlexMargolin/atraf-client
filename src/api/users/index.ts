export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  profile_picture: string
  created_at: string
}

export type UserFields = {
  email: string
  first_name: string
  last_name: string
  profile_picture: string
}

export type ReadOneResponse = {
  user: User
}
export type ReadOneFunc = (userId: string) => Promise<ReadOneResponse>
