import { useEffect, useRef } from "react"
import { UseEffectPreviousHook } from "./"

/**
 * useEffect wrapper with the additional previous state value argument.
 * @param effect
 * @param value
 */
const useEffectPrevious: UseEffectPreviousHook = (effect, value) => {
  const ref = useRef<typeof value>()

  useEffect(() => {
    const previous = ref.current

    // store previous value
    ref.current = value

    return effect(previous)
  }, [effect, value])
}

export default useEffectPrevious
