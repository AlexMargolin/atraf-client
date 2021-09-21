import { lazy } from "react";
import { history } from "./";

export type NavigationRoutes = keyof typeof routes;

const routes = {
  home: {
    path: "/",
    component: lazy(
      () => import(/* webpackChunkName: "home" */ "@/views/posts"),
    ),
  },

  login: {
    path: "/login",
    component: lazy(
      () => import(/* webpackChunkName: "login" */ "@/views/login"),
    ),
  },

  register: {
    path: "/register",
    component: lazy(
      () =>
        import(/* webpackChunkName: "register" */ "@/views/register"),
    ),
  },

  activate: {
    path: "/activate",
    component: lazy(
      () =>
        import(/* webpackChunkName: "activate" */ "@/views/activate"),
    ),
  },

  post: {
    path: "/post/:id",
    component: lazy(
      () => import(/* webpackChunkName: "post" */ "@/views/post"),
    ),
  },

  notFound: {
    path: "/404",
    component: lazy(
      () => import(/* webpackChunkName: "404" */ "@/views/404"),
    ),
  },
};

/**
 * Router history.push wrapper
 * @param route
 */
export const NavigateTo = (route: NavigationRoutes): void => {
  history.push(routes[route].path);
};

export default routes;
