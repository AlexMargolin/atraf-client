import { AlertProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./alert.module.scss"

const classes = makeClasses(modules)

export const classNames = {
  root: "alert",
}

/**
 * Alert Component
 *
 * @since 1.0.0
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (props, forwardedRef) => {
    const { className, children, type = "info", ...rest } = props

    const attrClasses = {
      [`alert--${type}`]: !!type,
    }

    return (
      <div
        ref={forwardedRef}
        className={classes(classNames.root, className, attrClasses)}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export default Alert
