import { HTMLAttributes, ReactElement } from "react"

/**
 * Modal Imperative Handle.
 * Use to gain control of the modal from parent components.
 */
export type ModalHandle = {
  /**
   * Open Modal method
   */
  open: () => void

  /**
   * Close Modal method
   */
  close: () => void

  /**
   * Toggle Modal method
   */
  toggle: () => void
}

/**
 * Modal Component Props
 */
export interface ModalProps extends HTMLAttributes<HTMLElement> {
  /**
   * Default Modal state
   * @default false
   */
  defaultVisible?: boolean

  /**
   * When true, disables the option to close the modal when a click
   * outside the dialog occurs or the ESC key is pressed.
   * @default false
   */
  persistent?: boolean

  /**
   * Modal trigger element
   * Provided element which will trigger the modal.
   * @default undefined
   */
  __activator?: ReactElement
}

import Modal from "./Modal"
export default Modal

export * from "./Modal"
