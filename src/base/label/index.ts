import { ComponentPropsWithRef } from "react"

export interface LabelProps extends ComponentPropsWithRef<"label"> {
  required?: boolean
}
