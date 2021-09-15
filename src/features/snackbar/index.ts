import { ComponentPropsWithoutRef } from "react";

export interface SnackbarProps
  extends ComponentPropsWithoutRef<"div"> {
  timeout?: number;
}

export type DispatchEvent = {
  message: string;
  timeout?: number;
  persistent?: boolean;
};

export type DispatchFunc = (event: DispatchEvent) => void;

import { dispatchSnackbar } from "./dispatch";

export { dispatchSnackbar };
