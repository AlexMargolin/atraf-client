import { LabelProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./label.module.scss"

const classes = makeClasses(modules)

const classNames = {
  root: "label",
  required: "label--required",
}

/**
 * Label Base.
 *
 * @since 1.0.0
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props, forwardedRef) => {
    const { children, required, className, ...rest } = props

    return (
      <label
        ref={forwardedRef}
        className={classes(classNames.root, className, {
          [classNames.required]: required,
        })}
        {...rest}
      >
        {children}
      </label>
    )
  },
)

export default Label
