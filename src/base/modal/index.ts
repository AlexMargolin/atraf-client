import { ComponentPropsWithRef, ReactElement } from "react";

export type ModalHandle = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export interface ModalProps extends ComponentPropsWithRef<"div"> {
  defaultVisible?: boolean;
  persistent?: boolean;
  __activator?: ReactElement;
}

import { default as Modal } from "./modal";
export default Modal;

export * from "./modal";
