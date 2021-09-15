import { KbdProps } from "./"
import { forwardRef } from "react"
import { makeClasses } from "@/hooks"
import modules from "./kbd.modules.scss"
import { Icon } from "@/components"

const classes = makeClasses(modules)

export const classNames = {
  root: "kbd",
  icon: "kbd__icon",
}

const Kbd = forwardRef<HTMLElement, KbdProps>(
  (props, forwardedRef) => {
    const { className, iconId, keyName, ...rest } = props

    return (
      <kbd
        title={keyName}
        ref={forwardedRef}
        className={classes(classNames.root, className)}
        {...rest}
      >
        <Icon iconId={iconId} className={classes(classNames.icon)} />
      </kbd>
    )
  },
)

export default Kbd
