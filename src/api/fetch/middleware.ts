import { NavigateTo } from "@/router";
import { FetchMiddleware } from "@/api/fetch/index";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_UNAUTHORIZED = 401;

/**
 * @param {false|Response} response
 */
export const auth: FetchMiddleware = response => {
  // empty response means there's a network error
  // or the server might be down
  if (!response) {
    NavigateTo("notFound");
    return;
  }

  switch (response.status) {
    case HTTP_STATUS_UNAUTHORIZED:
      NavigateTo("login");
      break;
    case HTTP_STATUS_NOT_FOUND:
      NavigateTo("notFound");
      break;
  }
};
