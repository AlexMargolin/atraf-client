import { FC } from "react";
import { Button } from "@/components";
import { makeClasses } from "@/hooks";
import modules from "./header.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "header",
};

const Header: FC = () => {
  return (
    <header className={classes(classNames.root)}>
      <Button color='pink' variant='outlined'>
        Add New Post
      </Button>
    </header>
  );
};

export default Header;
