import { ResponseStatic } from "@/api";

export type FetchFunc = (
  url: string,
  config: RequestInit,
) => Promise<Response | false>;

export type RequestFunc = (
  path: string,
  method: string,
  data: unknown,
) => Promise<ResponseStatic>;

export type FetchMiddleware = (response: false | Response) => void;

export * as middleware from "./middleware";
