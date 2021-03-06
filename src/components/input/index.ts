import { ComponentPropsWithRef, ReactElement, ReactNode } from "react"

export interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string
  __start?: ReactElement
  __end?: ReactElement
  __helper?: ReactNode
}
