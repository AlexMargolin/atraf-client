import { useEffect } from "react"
import { isContained } from "@/utils"
import { UseClickAwayHook } from "./"

/**
 * Call the @callback when a mouse event occurred outside the @ref element.
 *
 * @param ref
 * @param onClickAway
 * @param init
 */
const useClickAway: UseClickAwayHook = (
  ref,
  onClickAway,
  init = {},
) => {
  const { eventType = "mousedown" } = init

  const handleMouseDown = (event: MouseEvent) => {
    const container = ref.current as unknown as Node
    const element = event.target as Node

    if (ref.current && !isContained(container, element)) {
      onClickAway(event)
    }
  }

  useEffect(() => {
    window.addEventListener(eventType, handleMouseDown)
    return () => {
      window.removeEventListener(eventType, handleMouseDown)
    }
  }, [ref, onClickAway])
}

export default useClickAway
