import { ResponseStatic } from "@/api";

export type AuthResponse = {
  account_id: string;
  account_active: string;
};

// Register
export type RegisterRequest = {
  email: string;
  password: string;
};
export type RegisterResponse = AuthResponse;
export type RegisterFunc = (
  params: RegisterRequest,
) => Promise<[RegisterResponse, ResponseStatic]>;

// Activate
export type ActivateRequest = {
  code: string;
};
export type ActivateResponse = AuthResponse;
export type ActivateFunc = (
  params: ActivateRequest,
) => Promise<[ActivateResponse, ResponseStatic]>;

// Login
export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = AuthResponse;
export type LoginFunc = (
  params: LoginRequest,
) => Promise<[LoginResponse, ResponseStatic]>;

// Forgot
export type ForgotRequest = {
  email: string;
};
export type ForgotFunc = (
  params: ForgotRequest,
) => Promise<[null, ResponseStatic]>;
