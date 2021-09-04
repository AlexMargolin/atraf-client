import { CardProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./card.module.scss"

const classes = makeClasses(modules)

export const classNames = {
  root: "card",
}

/**
 * Card Component
 *
 * @since 1.0.0
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, forwardedRef) => {
    const { className, children, ...rest } = props

    return (
      <div
        ref={forwardedRef}
        className={classes(classNames.root, className)}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export default Card
