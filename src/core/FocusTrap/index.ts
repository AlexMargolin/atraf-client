import { ComponentPropsWithRef } from "react"

export interface FocusTrapProps extends ComponentPropsWithRef<"div"> {
  /**
   * Programmatically enable or disable the focus trap
   */
  active?: boolean

  /**
   * Include the root container in the tab-index order.
   */
  includeSelf?: boolean
}

export { focusableElementsSelector } from "./focusable-elements"
