import { CSSProperties } from "react"

export type GetAnimationDurationFunc = (
  animationDuration:
    | CSSStyleDeclaration["transitionDuration"]
    | CSSStyleDeclaration["animationDuration"],
) => number

export type ClassOnAnimate = (
  element: HTMLElement,
  className: string,
  onComplete?: () => void,
) => void

export type OnNextDOMUpdateFunc = (fn: () => void) => void

export type SetClassFunc = (
  element: HTMLElement,
  ...className: string[]
) => void

export type ToggleClassFunc = (
  element: HTMLElement,
  condition: boolean,
  className: string,
) => void

/**
 * Returns an element's width/height including:
 * margin, padding, border
 */
export type GetElementSizeFunc = (
  // Result of window.getComputedStyle.
  style: CSSStyleDeclaration,
) => number

export type DomElementCoords = {
  top: number
  left: number
  width: number
  height: number
}
export type GetDomElementCoordsFunc = (
  element: HTMLElement,
  withSpacings?: boolean,
) => DomElementCoords

export type GetAppendSizeUnit = (
  size: number,
  unit?: string,
) => string

export type SetStyleFunc = (
  element: HTMLElement,
  props: CSSProperties,
) => void

export type IsContainedFunc = (
  container: Node,
  element: Node,
) => boolean
