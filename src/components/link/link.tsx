import { LinkProps } from "./"
import { NavigateTo, routes } from "@/router"
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
 * TODO refactor this
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, forwardedRef) => {
    const { children, route, ...rest } = props
    const location = routes[route].path

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      NavigateTo(route)
    }

    return (
      <a
        href={location}
        ref={forwardedRef}
        onClick={handleClick}
        className={classes(classNames.root)}
        {...rest}
      >
        {children}
      </a>
    )
  },
)

export default Link
