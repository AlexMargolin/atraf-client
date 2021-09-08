export type RegisterRequest = { email: string; password: string }
export type RegisterResponse = { user_id: string }
export type RegisterFunc = (
  params: RegisterRequest,
) => Promise<RegisterResponse>

export type LoginRequest = { email: string; password: string }
export type LoginResponse = { access_token: string }
export type LoginFunc = (
  params: LoginRequest,
) => Promise<LoginResponse>
