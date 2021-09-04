import { ComponentPropsWithRef, ReactElement, ReactNode } from "react"

export interface InputProps extends ComponentPropsWithRef<"input"> {
  helper?: ReactNode
  __start?: ReactElement
  __end?: ReactElement
}
