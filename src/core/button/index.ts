import { ComponentPropsWithRef } from "react"

export type ButtonVariants = "outlined" | "filled"
export type ButtonColors = "primary" | "secondary" | "black"

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariants
  color?: ButtonColors
}
