import { ComponentPropsWithRef } from "react";

export interface CardProps extends ComponentPropsWithRef<"div"> {
  loading?: boolean;
  flat?: boolean;
}

export type CardTitleProps = ComponentPropsWithRef<"h3">;
export type CardContentProps = ComponentPropsWithRef<"div">;
export type CardActionsProps = ComponentPropsWithRef<"div">;

import * as Card from "./card";

const CardComponents = {
  Title: Card.Title,
  Content: Card.Content,
  Actions: Card.Actions,
};

export default Object.assign(Card.default, CardComponents);
