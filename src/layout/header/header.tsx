import { FC } from "react";
import { makeClasses } from "@/hooks";
import modules from "./header.module.scss";
import { Button, Container } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "header",
  newpost: "header__newpost",
};

const Header: FC = () => {
  return (
    <header className={classes(classNames.root)}>
      <Container>
        <Button
          color='pink'
          variant='outlined'
          className={classes(classNames.newpost)}
        >
          Add New Post
        </Button>
      </Container>
    </header>
  );
};

export default Header;
