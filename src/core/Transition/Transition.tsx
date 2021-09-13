import {
  FC,
  useRef,
  useState,
  Children,
  useEffect,
  cloneElement,
  isValidElement,
} from "react"
import {
  mergeRefs,
  removeClass,
  classOnAnimate,
  onNextDOMUpdate,
} from "@/utils"
import TransitionProps from "./"
import { makeClasses } from "@/hooks"

const classes = makeClasses(null)

export const TRANSITION_IN = "enter"
export const TRANSITION_OUT = "leave"

export const classNames = {
  [TRANSITION_IN]: {
    active: "transition-enter",
    to: "transition-enter-to",
    from: "transition-enter-from",
  },
  [TRANSITION_OUT]: {
    active: "transition-leave",
    to: "transition-leave-to",
    from: "transition-leave-from",
  },
}

/**
 * Transition Component
 *
 * Adds transition classes between DOM inserts and animations.
 *
 * @since 1.0.0
 */
const Transition: FC<TransitionProps> = props => {
  const { children, onComplete } = props

  const rootRef = useRef<HTMLDivElement>()

  // additional rendering condition - we want to prevent @show from directly affecting the render
  const [visible, setVisible] = useState(() => props.in)

  // allow a single child descendent
  const rootElement = Children.only(children)

  // current transition type
  const type = props.in ? TRANSITION_IN : TRANSITION_OUT

  // transition classes based on current state.
  // "in" classes when @props.in is true
  // "out" classes when @props.in is false
  const transitionClasses = {
    to: classNames[type].to,
    from: classNames[type].from,
    active: classNames[type].active,
  }

  useEffect(() => {
    const element = rootRef.current
    const { to, from, active } = transitionClasses

    if (!element) {
      return
    }

    // we defer the class changes by 1 frame in order for the inserted classes to be present in the dom.
    onNextDOMUpdate(() => {
      // @from class must be removed the same time @to is added.
      removeClass(element, from)

      // add @to class and remove it after the animation completes
      classOnAnimate(element, to, () => {
        removeClass(element, active)
        setVisible(props.in)

        if (onComplete instanceof Function) {
          onComplete(props.in)
        }
      })
    })
  }, [props.in])

  // classes which are added before state changes
  const { active, from } = transitionClasses

  const TransitionElement =
    isValidElement(rootElement) &&
    cloneElement(rootElement, {
      // @ts-expect-error: ref is not part of the @types definition
      ref: mergeRefs([rootRef, rootElement.ref]),
      className: classes(active, from, rootElement.props.className),
    })

  return props.in || visible ? TransitionElement : null
}

export default Transition
