import { ResponseStatic } from "@/api"

export type RegisterRequest = {
  email: string
  password: string
}

export type RegisterFunc = (
  params: RegisterRequest,
) => Promise<[null, ResponseStatic]>

export type LoginRequest = {
  email: string
  password: string
}

export type LoginFunc = (
  params: LoginRequest,
) => Promise<[null, ResponseStatic]>

export type ActivateRequest = {
  code: string
}

export type ActivateFunc = (
  params: ActivateRequest,
) => Promise<[null, ResponseStatic]>
