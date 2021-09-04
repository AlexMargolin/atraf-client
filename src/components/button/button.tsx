import { ButtonProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./Button.module.scss"

const classes = makeClasses(modules)

export const classNames = {
  root: "button",
}

/**
 * Button Core
 *
 * @since 1.0.0
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      grow,
      variant = "filled",
      color,
      ...rest
    } = props

    const attrClasses = {
      [`button--grow`]: grow,
      [`button--${color}`]: !!color,
      [`button--${variant}`]: !!variant,
    }

    return (
      <button
        ref={forwardedRef}
        className={classes(classNames.root, attrClasses, className)}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

export default Button
