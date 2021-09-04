import {
  useRef,
  useState,
  FormEvent,
  forwardRef,
  cloneElement,
  ReactElement,
} from "react"
import { Label } from "@/base"
import { InputProps } from "./"
import { mergeRefs } from "@/utils"
import modules from "./input.module.scss"
import { makeClasses, useUniqueId } from "@/hooks"

const classes = makeClasses(modules)

const classNames = {
  root: "input",
  slot: "input__slot",
  field: "input__field",
  error: "input__error",
  helper: "input__helper",
  hasError: "input--error",
  wrapper: "input__wrapper",
}

/**
 * Input Component
 *
 * @since 1.0.0
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const {
      className,
      label,
      required,
      __end,
      __start,
      __helper,
      ...rest
    } = props

    const uid = useUniqueId("input")
    const inputRef = useRef<HTMLInputElement>()

    const [errors, setErrors] = useState<Array<string>>([])

    const hasErrors = Boolean(errors.length)
    const helperId = `helper-${uid}`

    /**
     * @param element
     * @return ReactElement
     */
    const attachSlotClass = (element: ReactElement) => {
      return cloneElement(element, {
        className: classes(classNames.slot, element.props.className),
      })
    }

    /**
     * Handle Input <input> event
     * @param event
     */
    const handleInput = (event: FormEvent): void => {
      const errors = []
      const target = event.target as HTMLInputElement

      // native validation message
      if (!target.checkValidity()) {
        errors.push(target.validationMessage)
      }

      setErrors(errors)
    }

    return (
      <div
        className={classes(classNames.root, {
          [classNames.hasError]: hasErrors,
        })}
      >
        <Label htmlFor={uid} required={required}>
          {label}
        </Label>

        <div className={classes(classNames.wrapper)}>
          {__start && attachSlotClass(__start)}

          <input
            id={uid}
            onInput={handleInput}
            aria-invalid={hasErrors ? true : undefined}
            aria-describedby={hasErrors ? helperId : undefined}
            ref={mergeRefs([forwardedRef, inputRef])}
            className={classes(classNames.field, className)}
            {...rest}
          />

          {__end && attachSlotClass(__end)}
        </div>

        {hasErrors && (
          <em id={helperId} className={classes(classNames.helper)}>
            {errors[0]}
          </em>
        )}

        {__helper && !hasErrors && (
          <em id={helperId} className={classes(classNames.helper)}>
            {__helper}
          </em>
        )}
      </div>
    )
  },
)

export default Input
