import { MergeRefsFunc } from "./index"

const mergeRefs: MergeRefsFunc = refs => {
  return value => {
    refs.forEach(ref => {
      if ("function" === typeof ref) {
        ref(value)
      } else if (ref && "string" !== typeof ref) {
        ref.current = value
      }
    })
  }
}

export default mergeRefs
