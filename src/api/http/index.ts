export type RequestData = Record<string, unknown>

export type HTTPRequestFunc = (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data: RequestData,
) => Promise<HTTPResponse>

export type HTTPResponse = {
  success: boolean
  status: number
  data: any
}

export type NormalizeFunc = (
  response: Response,
) => Promise<HTTPResponse>

export type PostRequestFunc = (
  path: string,
  data: RequestData,
) => Promise<HTTPResponse>

import { default as HTTP } from "./http"
export default HTTP
