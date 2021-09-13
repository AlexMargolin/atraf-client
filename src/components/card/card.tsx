import { CardProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import { Spinner } from "@/components"
import modules from "./card.module.scss"

const classes = makeClasses(modules)

export const classNames = {
  root: "card",
  flat: "card--flat",
}

/**
 * Card Component
 *
 * @since 1.0.0
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, forwardedRef) => {
    const { className, flat, children, loading, ...rest } = props

    const modifiers = {
      [classNames.flat]: flat,
    }

    return (
      <div
        ref={forwardedRef}
        className={classes(classNames.root, modifiers, className)}
        {...rest}
      >
        <Spinner active={loading} />
        {children}
      </div>
    )
  },
)

export default Card
