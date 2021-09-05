import {
  HTTPResponse,
  NormalizeFunc,
  HTTPRequestFunc,
  PostRequestFunc,
} from "./"

export default class HTTP {
  BASE_URL = ""

  constructor() {
    this.BASE_URL = this.unTrailingSlash(process.env.APP_API_URL)
  }

  /**
   * Generic HTTP Post Request.
   * @param path
   * @param data
   * @return Promise<HTTPResponse>
   */
  protected Post: PostRequestFunc = async (path, data) => {
    return await this.request(path, "POST", data)
  }

  /**
   * Generic request method.
   * @param path
   * @param method
   * @param data
   * @return Promise<HTTPResponse>
   */
  private request: HTTPRequestFunc = async (path, method, data) => {
    const options = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }

    const url = this.getRequestUrl(path)

    try {
      const response = await fetch(url, options)
      return await this.normalizeJson(response)
    } catch (e) {
      return this.getZeroValueResponse()
    }
  }

  /**
   * Normalizes the Fetch Response.
   * @param response
   * @return Promise<HTTPResponse>
   */
  private normalizeJson: NormalizeFunc = async response => {
    const result = this.getZeroValueResponse()

    result.success = response.ok
    result.status = response.status

    // Attempt to parse json
    if (this.hasJsonResponseHeader(response.headers)) {
      try {
        result.data = await response.json()
      } catch (e) {
        result.status = 0
        result.success = false
      }
    }

    return result
  }

  /**
   * Zero value of the response type
   * @return HTTPResponse
   */
  private getZeroValueResponse = (): HTTPResponse => {
    return { success: false, status: 0, data: {} }
  }

  /**
   * Determine whether the response has JSON content type header.
   * @param headers
   * @return boolean
   */
  private hasJsonResponseHeader = (headers: Headers): boolean => {
    return "application/json" === headers.get("content-type")
  }

  /**
   * Removes trailing slash.
   * @param url
   * @returns string
   */
  private unTrailingSlash = (url: string): string => {
    return url.endsWith("/") ? url.slice(0, -1) : url
  }

  /**
   * @param path
   * @returns string
   */
  private getRequestUrl = (path: string): string => {
    return this.BASE_URL + path
  }
}
