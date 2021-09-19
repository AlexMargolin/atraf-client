import { FC } from "react";
import { Icon } from "@/base";
import { makeClasses } from "@/hooks";
import modules from "./header.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "header",
  icon: "header__icon",
  link: "header__link",
};

const Header: FC = () => {
  return (
    <header className={classes(classNames.root)}>
      <a href='#' className={classes(classNames.link)}>
        <Icon
          iconId='icon-home'
          className={classes(classNames.icon)}
        />
      </a>
    </header>
  );
};

export default Header;
