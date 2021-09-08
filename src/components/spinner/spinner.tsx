import { FC } from "react"
import { SpinnerProps } from "./"
import { makeClasses } from "@/hooks"
import { createPortal } from "react-dom"
import modules from "./spinner.module.scss"

const classes = makeClasses(modules)

const classNames = {
  root: "spinner",
  element: "spinner__element",
}

const Spinner: FC<SpinnerProps> = props => {
  const { active, fullScreen = true } = props

  const spinner = (
    <div className={classNames.root}>
      <span className={classes(classNames.element)} />
    </div>
  )

  if (active) {
    if (fullScreen) {
      return createPortal(spinner, document.body)
    }

    return spinner
  }

  return null
}

export default Spinner
