import { MutableRefObject } from "react"

export type UseClickAwayInit = {
  eventType?: string
}

export type UseClickAwayHook = <T>(
  ref: MutableRefObject<T>,
  onClickAway: (event: MouseEvent) => void,
  init?: UseClickAwayInit,
) => void
