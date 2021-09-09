import { ForwardedRef, MutableRefObject } from "react"

export type UseInViewHook = <T>(
  observedRef: MutableRefObject<T> | ForwardedRef<T>,
  callback: UseInViewCallback,
  init?: UseInViewInit,
) => void

export type UseInViewCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void

export interface UseInViewInit extends IntersectionObserverInit {
  once?: boolean
  steps?: number
}

export { default as createThreshold } from "./createThreshold"
