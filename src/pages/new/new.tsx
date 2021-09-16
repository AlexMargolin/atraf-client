import { FC } from "react";
import { makeClasses } from "@/hooks";
import modules from "./new.module.scss";
import { Container } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "new",
};

const New: FC = () => {
  return (
    <Container className={classes(classNames.root)}>
      new post
    </Container>
  );
};

export default New;
