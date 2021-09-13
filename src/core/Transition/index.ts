import { ComponentPropsWithRef } from "react"

export default interface TransitionProps
  extends ComponentPropsWithRef<"div"> {
  in?: boolean
  onComplete?: (visible: boolean) => void
}
