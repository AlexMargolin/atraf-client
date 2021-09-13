import {
  SetClassFunc,
  SetStyleFunc,
  ClassOnAnimate,
  IsContainedFunc,
  ToggleClassFunc,
  GetAppendSizeUnit,
  GetElementSizeFunc,
  OnNextDOMUpdateFunc,
  GetDomElementCoordsFunc,
  GetAnimationDurationFunc,
} from "./"

/**
 * classList.add wrapper
 * @param element
 * @param className
 */
export const addClass: SetClassFunc = (element, ...className) => {
  element.classList.add(...className)
}

/**
 * classList.remove wrapper
 * @param element
 * @param className
 */
export const removeClass: SetClassFunc = (element, ...className) => {
  element.classList.remove(...className)
}

/**
 * classList.toggle wrapper
 * @param element
 * @param condition
 * @param className
 */
export const toggleClass: ToggleClassFunc = (
  element,
  condition,
  className,
) => {
  element.classList.toggle(className, condition)
}

/**
 * @param container
 * @param element
 */
export const isContained: IsContainedFunc = (container, element) => {
  return container.contains(element)
}

/**
 * Defers function execution by 1 frame
 * https://bugs.chromium.org/p/chromium/issues/detail?id=675795
 * @param fn
 */
export const onNextDOMUpdate: OnNextDOMUpdateFunc = fn => {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      fn()
    }),
  )
}

/**
 * Normalizes CSS transition/animation duration values.
 * @param duration CSSStyleDeclaration["transitionDuration" || "animationDuration"]
 * @return number duration in milliseconds
 */
export const getAnimationDuration: GetAnimationDurationFunc =
  duration => {
    const durationInSeconds = parseFloat(duration)
    const durationInMilliseconds = durationInSeconds * 1000

    // prevent cases when the value is between 1 and 0 ms
    return parseInt(String(durationInMilliseconds), 10)
  }

/**
 * Adds and removes a className based on the element's
 * css.animationDuration or css.transitionDuration
 * @param element
 * @param className
 * @param onComplete
 */
export const classOnAnimate: ClassOnAnimate = (
  element,
  className,
  onComplete,
) => {
  // add the class right away
  addClass(element, className)

  // remove class method
  const removeHandler = () => {
    removeClass(element, className)

    if (onComplete instanceof Function) {
      onComplete()
    }
  }

  // bail early if no animations / transitions exist
  if (!element.getAnimations().length) {
    removeHandler()
    return
  }

  // element's css properties
  const css = getComputedStyle(element)

  const animationDuration = getAnimationDuration(
    css.animationDuration,
  )

  const transitionDuration = getAnimationDuration(
    css.transitionDuration,
  )

  // determine the transition/animation duration
  if (0 < transitionDuration) {
    setTimeout(removeHandler, transitionDuration)
  } else if (0 < animationDuration) {
    setTimeout(removeHandler, animationDuration)
  } else {
    removeHandler()
    return
  }
}

/**
 * Calculates the element's total width.
 * Counting all the props listed in the @props array.
 * @param style
 * @return number width including spacings and borders.
 */
export const getElementWidth: GetElementSizeFunc = style => {
  const props = [
    "width",
    "margin-left",
    "margin-right",
    "padding-left",
    "padding-right",
    "border-left",
    "border-right",
  ]

  return props.reduce((total, prop) => {
    const value = style.getPropertyValue(prop)
    return total + parseInt(value, 10)
  }, 0)
}

/**
 * Calculates the element's total height.
 * Counting all the props listed in the @props array.
 * @param style
 * @return number height including spacings and borders.
 */
export const getElementHeight: GetElementSizeFunc = style => {
  const props = [
    "height",
    "margin-top",
    "margin-bottom",
    "padding-top",
    "padding-bottom",
    "border-top",
    "border-bottom",
  ]

  return props.reduce((total, prop) => {
    const value = style.getPropertyValue(prop)
    return total + parseInt(value, 10)
  }, 0)
}

/**
 * @param element
 * @param withSpacings include margin, padding, border
 * @return Object elements coordinates.
 */
export const getDOMElementCoords: GetDomElementCoordsFunc = (
  element,
  withSpacings,
) => {
  let _width = 0,
    _height = 0

  if (withSpacings) {
    const style = getComputedStyle(element)

    _width = getElementWidth(style)
    _height = getElementHeight(style)
  }

  return {
    top: element.offsetTop,
    left: element.offsetLeft,
    width: withSpacings ? _width : element.offsetWidth,
    height: withSpacings ? _height : element.offsetHeight,
  }
}

/**
 * Adds a distance (eg, px, rem, etc...) unit to a size number.
 * @param size
 * @param unit
 * @return string size affixed by the unit.
 */
export const getAppendSizeUnit: GetAppendSizeUnit = (
  size,
  unit = "px",
) => {
  return `${size}${unit}`
}

/**
 * Set Element style properties.
 * @param element
 * @param props
 */
export const setStyle: SetStyleFunc = (element, props) => {
  Object.assign(element.style, props)
}
