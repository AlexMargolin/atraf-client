import { ForwardedRef, MutableRefObject, RefCallback } from "react"

export type MergeRefsFunc = <T>(
  refs: Array<MutableRefObject<T> | ForwardedRef<T>>,
) => RefCallback<T>
