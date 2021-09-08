import App from "@/App"
import React from "react"
import ReactDOM from "react-dom"
import { makeClasses } from "@/hooks"
import { APP_ROOT_ID } from "@/defines"
import modules from "@/scss/app.module.scss"

const classes = makeClasses(modules)
const root = document.createElement("DIV")

Object.assign(root, {
  className: classes(APP_ROOT_ID),
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body.appendChild(root),
)
