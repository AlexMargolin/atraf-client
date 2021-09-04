import { ComponentPropsWithRef } from "react"

export type ButtonVariants = "outlined" | "filled"
export type ButtonColors = "primary" | "secondary" | "black" | "gray"

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariants
  color?: ButtonColors
  grow?: boolean
}
