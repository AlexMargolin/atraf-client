import { mergeRefs } from "@/utils"
import { FocusTrapProps } from "./"
import { focusableElementsSelector } from "./"
import { useRef, useEffect, forwardRef } from "react"

const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>(
  (props, forwardedRef) => {
    const { children, includeSelf, active = true, ...rest } = props

    const rootRef = useRef<HTMLDivElement>()

    useEffect(() => {
      if (!rootRef.current || !active) {
        return null
      }

      // Select all child focus-able elements
      const focusable = rootRef.current.querySelectorAll(
        focusableElementsSelector,
      )
      const elements = Array.from(focusable) as HTMLElement[]

      // adds root element to the beginning of the focusable items array
      if (includeSelf) {
        elements.unshift(rootRef.current)
      }

      const firstElement = elements[0]
      const lastElement = elements[elements.length - 1]

      const handleKeydown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement

        // skip unless Tab key is pressed
        if ("Tab" !== event.key) {
          return
        }

        // moving forward and its the last element
        if (!event.shiftKey && target === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }

        // moving backward and its the first element
        if (event.shiftKey && target === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      }

      rootRef.current.addEventListener("keydown", handleKeydown)
      return () => {
        rootRef.current?.removeEventListener("keydown", handleKeydown)
      }
    }, [active, includeSelf])

    return (
      <div
        tabIndex={includeSelf ? 0 : null}
        ref={mergeRefs([forwardedRef, rootRef])}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export default FocusTrap
