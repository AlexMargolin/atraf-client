import { ResponseStatic } from "@/api";

export type Account = {
  active: boolean;
};

// Register
export type RegisterRequest = {
  email: string;
  password: string;
};
export type RegisterResponse = Account;
export type RegisterFunc = (
  params: RegisterRequest,
) => Promise<[RegisterResponse, ResponseStatic]>;

// Activate
export type ActivateRequest = {
  code: string;
};
export type ActivateResponse = Account;
export type ActivateFunc = (
  params: ActivateRequest,
) => Promise<[ActivateResponse, ResponseStatic]>;

// Login
export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = Account;
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
