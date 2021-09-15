import { ComponentPropsWithRef } from "react";

export type SpinnerSizes = "small" | "large";

export interface SpinnerProps extends ComponentPropsWithRef<"span"> {
  size?: SpinnerSizes;
}
