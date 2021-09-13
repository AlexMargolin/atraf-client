import { ComponentPropsWithRef } from "react"

export type AlertType = "info" | "error" | "success"

export interface AlertProps extends ComponentPropsWithRef<"div"> {
  type?: AlertType
  flat?: boolean
  hideIcon?: boolean
}
