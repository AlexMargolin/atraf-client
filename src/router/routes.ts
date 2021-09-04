import { lazy } from "react"
import { RouteProps } from "react-router-dom"

const routes: Record<string, RouteProps> = {
  login: {
    path: "/login",
    component: lazy(
      () => import(/* webpackChunkName: "login" */ "@/views/login"),
    ),
  },
  notFound: {
    path: "*",
    component: lazy(
      () => import(/* webpackChunkName: "404" */ "@/views/404"),
    ),
  },
}

export default routes
