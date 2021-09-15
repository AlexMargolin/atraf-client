import { DispatchFunc } from "./index";
import { SNACKBAR_EVENT_TYPE } from "./snackbar";

/**
 * @param data
 */
export const dispatchSnackbar: DispatchFunc = data => {
  dispatchEvent(
    new CustomEvent(SNACKBAR_EVENT_TYPE, { detail: data }),
  );
};
