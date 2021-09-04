import { LinkProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./link.module.scss"

const classes = makeClasses(modules)

const classNames = {
  root: "link",
}
/**
 * Link Component
 *
 * @since 1.0.0
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardedRef) => {
    const { children, href = "#", ...rest } = props

    return (
      <a
        href={href}
        ref={forwardedRef}
        className={classes(classNames.root)}
        {...rest}
      >
        {children}
      </a>
    )
  },
)

export default Link
