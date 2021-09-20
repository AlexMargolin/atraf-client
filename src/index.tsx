import App from "@/App";
import React from "react";
import ReactDOM from "react-dom";
import { makeClasses } from "@/hooks";
import { APP_ROOT_ID } from "@/defines";
import modules from "@/scss/app.module.scss";
import { AccountProvider } from "@/providers";

const classes = makeClasses(modules);
const root = document.createElement("div");

Object.assign(root, {
  className: classes(APP_ROOT_ID),
});

ReactDOM.render(
  <React.StrictMode>
    <AccountProvider>
      <App />
    </AccountProvider>
  </React.StrictMode>,
  document.body.appendChild(root),
);
