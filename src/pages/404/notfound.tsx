import { FC } from "react";
import { makeClasses } from "@/hooks";
import modules from "./notfound.module.scss";

const classes = makeClasses(modules);

export const classNames = {
  root: "notfound",
};

const Notfound: FC = () => {
  return <div className={classes(classNames.root)}>404</div>;
};

export default Notfound;
