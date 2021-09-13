import { AlertProps } from "./"
import { forwardRef } from "react"
import { Icon } from "@/components"
import { makeClasses } from "@/hooks"
import modules from "./alert.module.scss"

const classes = makeClasses(modules)

export const classNames = {
  root: "alert",
  icon: "alert__icon",
}

/**
 * Alert Component
 *
 * @since 1.0.0
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (props, forwardedRef) => {
    const {
      flat,
      children,
      hideIcon,
      className,
      type = "info",
      ...rest
    } = props

    const attrClasses = {
      [`alert--flat`]: flat,
      [`alert--${type}`]: !!type,
    }

    return (
      <div
        role='alert'
        ref={forwardedRef}
        className={classes(classNames.root, className, attrClasses)}
        {...rest}
      >
        {!hideIcon && (
          <Icon
            role='presentation'
            iconId={`icon-${type}`}
            className={classes(classNames.icon)}
          />
        )}
        {children}
      </div>
    )
  },
)

export default Alert
