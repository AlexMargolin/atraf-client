import { LineProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./line.module.scss"

const classes = makeClasses(modules)

const classNames = {
  root: "line",
}

const Line = forwardRef<HTMLDivElement, LineProps>(
  (props, forwardedRef) => {
    const { ...rest } = props

    return (
      <div
        role='separator'
        ref={forwardedRef}
        className={classes(classNames.root)}
        {...rest}
      />
    )
  },
)

export default Line
