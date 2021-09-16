import { forwardRef } from "react";
import { ContainerProps } from "./";
import { makeClasses } from "@/hooks";
import modules from "./container.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "container",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, forwardedRef) => {
    const { className, children, ...rest } = props;

    return (
      <div
        ref={forwardedRef}
        className={classes(classNames.root, className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export default Container;
