import {
  Route,
  Switch,
  Router as HistoryRouter,
} from "react-router-dom"
import { history, routes } from "./"
import { FC, Suspense } from "react"

/**
 * History Router Component
 * @constructor
 */
const Router: FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback='Loading...'>
        <Switch>
          <Route
            exact
            path={routes.login.path}
            component={routes.login.component}
          />

          <Route
            exact
            path={routes.register.path}
            component={routes.register.component}
          />

          <Route
            path={routes.notFound.path}
            component={routes.notFound.component}
          />
        </Switch>
      </Suspense>
    </HistoryRouter>
  )
}

export default Router
