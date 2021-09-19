import {
  CardProps,
  CardTitleProps,
  CardActionsProps,
  CardContentProps,
} from "./";
import { Spinner } from "@/base";
import { forwardRef } from "react";
import { makeClasses } from "@/hooks";
import modules from "./card.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  card: {
    root: "card",
    flat: "card--flat",
    overlay: "card__overlay",
  },

  title: {
    root: "card__title",
  },

  content: {
    root: "card__content",
  },

  actions: {
    root: "card__actions",
  },
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, forwardedRef) => {
    const { className, flat, children, loading, ...rest } = props;

    const modifiers = {
      [classNames.card.flat]: flat,
    };

    return (
      <div
        ref={forwardedRef}
        className={classes(
          classNames.card.root,
          modifiers,
          className,
        )}
        {...rest}
      >
        {loading && (
          <div className={classes(classNames.card.overlay)}>
            <Spinner />
          </div>
        )}
        {children}
      </div>
    );
  },
);

const Title = forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, forwardedRef) => {
    const { children, ...rest } = props;

    return (
      <h3
        ref={forwardedRef}
        className={classes(classNames.title.root)}
        {...rest}
      >
        {children}
      </h3>
    );
  },
);

const Content = forwardRef<HTMLParagraphElement, CardContentProps>(
  (props, forwardedRef) => {
    const { children, ...rest } = props;

    return (
      <p
        ref={forwardedRef}
        className={classes(classNames.content.root)}
        {...rest}
      >
        {children}
      </p>
    );
  },
);

const Actions = forwardRef<HTMLDivElement, CardActionsProps>(
  (props, forwardedRef) => {
    const { children, ...rest } = props;

    return (
      <div
        ref={forwardedRef}
        className={classes(classNames.actions.root)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export default Card;
export { Title, Content, Actions };
