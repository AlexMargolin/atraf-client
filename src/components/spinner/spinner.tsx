import { forwardRef } from "react";
import { SpinnerProps } from "./";
import { makeClasses } from "@/hooks";
import modules from "./spinner.module.scss";

const classes = makeClasses(modules);

const classNames = {
  root: "spinner",
};

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (props, forwardedRef) => {
    const { className, size, ...rest } = props;

    const modifiers = {
      [`spinner--${size}`]: !!size,
    };

    return (
      <span
        ref={forwardedRef}
        className={classes(classNames.root, modifiers, className)}
        {...rest}
      />
    );
  },
);

export default Spinner;
