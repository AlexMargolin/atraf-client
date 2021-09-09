import { useState } from "react"
import { UseUniqueIdFunc } from "./"

let __internalUniqueIdValue = 0

/**
 * Generate a unique id with an optional prefix
 * @param prefix
 */
const __internalUniqueIdFunc: UseUniqueIdFunc = prefix => {
  return `${prefix || "uid"}-${__internalUniqueIdValue++}`
}

/**
 * Returns a globally unique Identifier
 * Note: Doesn't work with SSR.
 * @param prefix
 */
const useUniqueId: UseUniqueIdFunc = prefix => {
  const [uid] = useState(() => __internalUniqueIdFunc(prefix))
  return uid
}

export default useUniqueId
