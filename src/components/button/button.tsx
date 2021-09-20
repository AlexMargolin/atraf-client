import { ButtonProps } from "./";
import { Spinner } from "@/base";
import { forwardRef } from "react";
import { makeClasses } from "@/hooks";
import modules from "./button.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "button",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      grow,
      size,
      color,
      loading,
      children,
      disabled,
      className,
      type = "button",
      variant = "filled",
      ...rest
    } = props;

    const modifiers = {
      [`button--grow`]: grow,
      [`button--loading`]: loading,
      [`button--${size}`]: !!size,
      [`button--${color}`]: !!color,
      [`button--${variant}`]: !!variant,
    };

    return (
      <button
        type={type}
        ref={forwardedRef}
        disabled={disabled || loading}
        className={classes(classNames.root, modifiers, className)}
        {...rest}
      >
        {children}
        {loading && <Spinner size='small' />}
      </button>
    );
  },
);

export default Button;
