import { HTTPResponse } from "@/api/http"

export type AccountRegisterFunc = (
  email: string,
  password: string,
) => Promise<HTTPResponse>

export type AccountLoginFunc = (
  email: string,
  password: string,
) => Promise<HTTPResponse>
