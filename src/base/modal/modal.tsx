import {
  useRef,
  useState,
  forwardRef,
  cloneElement,
  isValidElement,
  useImperativeHandle,
} from "react"
import { FocusTrap } from "@/core"
import { createPortal } from "react-dom"
import modules from "./Modal.module.scss"
import { ModalHandle, ModalProps } from "./"
import { toggleClass, classOnAnimate } from "@/utils"
import { makeClasses, useClickAway, useEffectPrevious } from "@/hooks"

const classes = makeClasses(modules)

export const classNames = {
  root: "modal__root",
  dialog: "modal__dialog",
  backdrop: "modal__backdrop",
  active: "modal--active",
  persistent: "modal__dialog--persistent",
}

/**
 * Modal Component
 * Displays a "popup" window covering the entire document.
 *
 * @since 1.0.0
 */
const Modal = forwardRef<ModalHandle, ModalProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      persistent,
      __activator,
      defaultVisible = false,
      ...rest
    } = props

    const dialogRef = useRef<HTMLDivElement>()
    const activatorRef = useRef<HTMLButtonElement>()

    const [modalVisible, setModalVisible] = useState(defaultVisible)

    // user provided Activator Component
    const hasActivator = isValidElement(__activator)

    // expose component API
    useImperativeHandle(
      forwardedRef,
      () => ({
        open: () => handleModalOpen(),
        close: () => handleModalClose(),
        toggle: () => handleModalToggle(),
      }),
      [modalVisible],
    )

    // handle modal dialog outside click
    useClickAway(dialogRef, event => {
      const isActivatorClick = event.target === activatorRef.current

      // skip if its an activator click
      if (!isActivatorClick) {
        handlePersistentClose()
      }
    })

    // handle window focus event
    const handleWindowFocus = (event: FocusEvent) => {
      event.preventDefault()
      dialogRef.current.focus()
    }

    // handle window keydown event
    const handleWindowKeydown = (event: KeyboardEvent) => {
      if ("Escape" == event.key) {
        handlePersistentClose()
      }
    }

    useEffectPrevious(previouslyVisible => {
      // toggle active modal body class
      toggleClass(
        document.body,
        modalVisible,
        classes(classNames.active),
      )

      // from: closed -> open
      // force focus on the modal
      if (modalVisible) {
        dialogRef.current.focus()
      }

      // from: open -> closed
      // set focus back to the activator element
      if (hasActivator && true === previouslyVisible) {
        activatorRef.current.focus()
      }

      if (modalVisible) {
        window.addEventListener("focus", handleWindowFocus)
        window.addEventListener("keydown", handleWindowKeydown)
      }

      return () => {
        window.removeEventListener("focus", handleWindowFocus)
        window.removeEventListener("keydown", handleWindowKeydown)
      }
    }, modalVisible)

    // user provided activator click handler
    const handleActivatorClick = () => {
      handleModalToggle()

      // maintain existing activator element onclick event
      if (__activator.props.onClick instanceof Function) {
        __activator.props.onClick()
      }
    }

    // modal close with persistent prop considerations
    // in case modal is persistent, adds a persistent class
    const handlePersistentClose = () => {
      if (persistent) {
        classOnAnimate(dialogRef.current, classNames.persistent)
      } else {
        handleModalClose()
      }
    }

    // handle state open
    const handleModalOpen = () => {
      setModalVisible(true)
    }

    // handle state close
    const handleModalClose = () => {
      setModalVisible(false)
    }

    // handle state toggle
    const handleModalToggle = () => {
      setModalVisible(!modalVisible)
    }

    const ModalElement = (
      <div className={classes(classNames.root, className)} {...rest}>
        <div className={classes(classNames.backdrop)} />
        <FocusTrap
          includeSelf
          role='dialog'
          ref={dialogRef}
          aria-modal={true}
          className={classes(classNames.dialog)}
        >
          {children}
        </FocusTrap>
      </div>
    )

    return (
      <>
        {hasActivator &&
          cloneElement(__activator, {
            // @ts-expect-error: ref is not part of the @types definition
            ref: activatorRef,
            onClick: handleActivatorClick,
          })}
        {modalVisible && createPortal(ModalElement, document.body)}
      </>
    )
  },
)

export default Modal
