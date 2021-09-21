import { FetchMiddleware } from "./";
import { NavigateTo } from "@/router";
import { dispatchSnackbar } from "@/features/snackbar";

/**
 * @param {false|Response} response
 */
export const dispatchStatus: FetchMiddleware = response => {
  dispatchEvent(
    new Event(`api.status.${response ? response.status : false}`),
  );
};

/**
 * @param {false|Response} response
 */
export const intercept: FetchMiddleware = response => {
  // empty response means there's a network error or the server might be down
  if (!response) {
    NavigateTo("notFound");
    return;
  }

  switch (response.status) {
    case 401:
      dispatchSnackbar({ message: "You've been logged out" });
      break;
    case 404:
      NavigateTo("notFound");
      break;
  }
};
