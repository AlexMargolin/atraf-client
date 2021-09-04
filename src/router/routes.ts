import { lazy } from "react"
import { RouteProps } from "react-router-dom"

const routes: Record<string, RouteProps> = {
  notFound: {
    path: "*",
    component: lazy(
      () => import(/* webpackChunkName: "404" */ "@/views/not-found"),
    ),
  },
}

export default routes
