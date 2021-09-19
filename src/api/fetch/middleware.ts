import { FetchMiddleware } from "./";
import { NavigateTo } from "@/router";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_UNAUTHORIZED = 401;

/**
 * @param {false|Response} response
 */
export const auth: FetchMiddleware = response => {
  // empty response means there's a network error
  // or the server might be down
  if (!response) {
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
