import { ComponentPropsWithRef } from "react"

export interface KbdProps extends ComponentPropsWithRef<"kbd"> {
  keyName: string
  iconId: string
}
