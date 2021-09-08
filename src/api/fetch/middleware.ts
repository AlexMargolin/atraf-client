import { NavigateTo } from "@/router"
import { FetchMiddleware } from "@/api/fetch/index"

const HTTP_STATUS_NOT_FOUND = 404
const HTTP_STATUS_UNAUTHORIZED = 401

/**
 * @param status
 */
export const auth: FetchMiddleware = status => {
  switch (status) {
    case HTTP_STATUS_UNAUTHORIZED:
      NavigateTo("login")
      break
    case HTTP_STATUS_NOT_FOUND:
      NavigateTo("notFound")
      break
  }
}
