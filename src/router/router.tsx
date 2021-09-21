import {
  Route,
  Switch,
  Redirect,
  Router as HistoryRouter,
} from "react-router-dom";
import { FC, Suspense } from "react";
import { routes, history, Protected, Public } from "./";

/**
 * History Router Component
 * @constructor
 */
const Router: FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback=''>
        <Switch>
          <Protected
            exact
            status='active'
            path={routes.home.path}
            component={routes.home.component}
          />

          <Protected
            exact
            status='active'
            path={routes.post.path}
            component={routes.post.component}
          />

          <Protected
            exact
            status='inactive'
            path={routes.activate.path}
            component={routes.activate.component}
          />

          <Public
            exact
            path={routes.login.path}
            component={routes.login.component}
          />

          <Public
            exact
            path={routes.register.path}
            component={routes.register.component}
          />

          <Route
            exact
            path={routes.notFound.path}
            component={routes.notFound.component}
          />

          <Redirect from='*' to={routes.notFound.path} />
        </Switch>
      </Suspense>
    </HistoryRouter>
  );
};

export default Router;
