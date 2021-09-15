import { Icon } from "@/components";
import { Transition } from "@/core";
import { makeClasses } from "@/hooks";
import { createPortal } from "react-dom";
import { ALERTS_TIMEOUT } from "@/defines";
import modules from "./snackbar.module.scss";
import { FC, useEffect, useState } from "react";
import { DispatchEvent, SnackbarProps } from "./";

const classes = makeClasses(modules);

export const SNACKBAR_EVENT_TYPE = "snackbarDispatch";

export const classNames = {
  root: "snackbar",
  message: "snackbar__message",
  close: {
    root: "snackbar__close",
    icon: "snackbar__close-icon",
  },
};

/**
 * Snackbar should be triggered by dispatching a
 * SNACKBAR_EVENT_TYPE event.
 */
const Snackbar: FC<SnackbarProps> = props => {
  const { className, ...rest } = props;

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>(null);

  const dismissHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    const dispatchHandler = (event: CustomEvent) => {
      const data = event.detail as DispatchEvent;

      setVisible(true);
      setMessage(data.message);

      // Hide the snackbar after the defined period.
      if (!data.persistent) {
        setTimeout(
          () => setVisible(false),
          data.timeout || ALERTS_TIMEOUT,
        );
      }
    };

    addEventListener(SNACKBAR_EVENT_TYPE, dispatchHandler);
    return () => {
      removeEventListener(SNACKBAR_EVENT_TYPE, dispatchHandler);
    };
  }, []);

  return createPortal(
    <Transition in={visible}>
      <div
        role='alert'
        className={classes(classNames.root, className)}
        {...rest}
      >
        <span className={classNames.message}>{message}</span>
        <button
          onClick={dismissHandler}
          className={classes(classNames.close.root)}
        >
          <Icon
            className={classes(classNames.close.icon)}
            iconId='icon-close'
          />
        </button>
      </div>
    </Transition>,
    document.body,
  );
};

export default Snackbar;
