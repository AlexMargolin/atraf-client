import { FC } from "react";
import { New } from "@/features";
import { Icon } from "@/base";
import { makeClasses } from "@/hooks";
import modules from "./header.module.scss";
import { useAccount } from "@/providers/account";

const classes = makeClasses(modules);

export const classNames = {
  root: "header",
  icon: "header__icon",
  link: "header__link",
};

const Header: FC = () => {
  const [account] = useAccount();

  if (!account) {
    return null;
  }

  return (
    <header className={classes(classNames.root)}>
      <a href='/' className={classes(classNames.link)}>
        <Icon
          iconId='icon-home'
          className={classes(classNames.icon)}
        />
      </a>

      <New />
    </header>
  );
};

export default Header;
