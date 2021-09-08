import {
  Handler,
  GetRequest,
  PutRequest,
  PostRequest,
  DeleteRequest,
  ResponseStatic,
} from "@/api"
import { FetchFunc, RequestFunc } from "./"

export default class Fetch implements Handler {
  static defaults = {}
  static base_url = {}

  /**
   * @param route
   */
  get: GetRequest = async route => {
    return this.request(route, "GET", null)
  }

  /**
   * @param path
   * @param data
   */
  post: PostRequest = async (path, data) => {
    return this.request(path, "POST", data)
  }

  /**
   * @param path
   * @param data
   */
  put: PutRequest = async (path, data) => {
    return this.request(path, "PUT", data)
  }

  /**
   * @param path
   */
  delete: DeleteRequest = async path => {
    return this.request(path, "DELETE", null)
  }

  /**
   * @param path
   * @param method
   * @param data
   */
  private request: RequestFunc = async (path, method, data) => {
    // Normalized result
    const result: ResponseStatic = {
      status: 0,
      ok: false,
      data: null,
    }

    const url = this.getRequestUrl(path)
    const response = await this.fetch(url, {
      method: method,
      body: JSON.stringify(data),
    })

    // Network error
    if (!response) {
      return result
    }

    // Attempt to parse json data
    if (Fetch.hasJsonHeaders(response.headers)) {
      const { data } = await response.json()
      result.data = data
    }

    // Response status range: 200-299
    result.ok = response.ok

    // HTTP status code
    result.status = response.status

    return result
  }

  /**
   * @param url
   * @param options
   */
  private fetch: FetchFunc = async (url, options) => {
    const config = Object.assign({}, Fetch.defaults, options)

    try {
      return await fetch(url, config)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("[Network Error]", error)
      return false
    }
  }

  /**
   * @param path
   */
  getRequestUrl = (path: string): string => {
    return Fetch.base_url + path
  }

  /**
   * @param headers
   * @return boolean
   */
  public static hasJsonHeaders = (headers: Headers): boolean => {
    return "application/json" === headers.get("content-type")
  }

  /**
   * @param url
   */
  public static setBaseUrl = (url: string): void => {
    Fetch.base_url = url
  }

  /**
   * @param config
   */
  public static setDefaults = (config: RequestInit): void => {
    Fetch.defaults = config
  }
}
