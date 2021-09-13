import { lazy } from "react"
import { history } from "./"

export type NavigationRoutes = keyof typeof routes

const routes = {
  home: {
    path: "/",
    component: lazy(
      () => import(/* webpackChunkName: "home" */ "@/pages/home"),
    ),
  },

  login: {
    path: "/login",
    component: lazy(
      () => import(/* webpackChunkName: "login" */ "@/pages/login"),
    ),
  },

  register: {
    path: "/register",
    component: lazy(
      () =>
        import(/* webpackChunkName: "register" */ "@/pages/register"),
    ),
  },

  post: {
    path: "/post/:id",
    component: lazy(
      () => import(/* webpackChunkName: "post" */ "@/pages/post"),
    ),
  },

  notFound: {
    path: "/404",
    component: lazy(
      () => import(/* webpackChunkName: "404" */ "@/pages/404"),
    ),
  },
}

/**
 * Router history.push wrapper
 * @param route
 */
export const NavigateTo = (route: NavigationRoutes): void => {
  history.push(routes[route].path)
}

export default routes
