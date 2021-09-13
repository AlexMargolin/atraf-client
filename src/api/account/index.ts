import { ResponseStatic } from "@/api"

export type RegisterRequest = {
  email: string
  password: string
}

export type RegisterResponse = {
  access_token: string
}

export type RegisterFunc = (
  params: RegisterRequest,
) => Promise<[RegisterResponse, ResponseStatic]>

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  access_token: string
}

export type LoginFunc = (
  params: LoginRequest,
) => Promise<[LoginResponse, ResponseStatic]>

export type ActivateRequest = {
  code: string
}

export type ActivateResponse = {
  access_token: string
}

export type ActivateFunc = (
  params: ActivateRequest,
) => Promise<[ActivateResponse, ResponseStatic]>
