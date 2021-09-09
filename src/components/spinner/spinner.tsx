import { FC } from "react"
import { SpinnerProps } from "./"
import { makeClasses } from "@/hooks"
import modules from "./spinner.module.scss"

const classes = makeClasses(modules)

const classNames = {
  root: "spinner",
  element: "spinner__element",
}

const Spinner: FC<SpinnerProps> = props => {
  const { active } = props

  return !active ? null : (
    <div className={classes(classNames.root)}>
      <span className={classes(classNames.element)} />
    </div>
  )
}

export default Spinner
