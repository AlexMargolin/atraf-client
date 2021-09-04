import { ComponentPropsWithRef } from "react"

export interface CardProps extends ComponentPropsWithRef<"div"> {
  loading?: boolean
}
