import { routes } from "./"
import { FC, Suspense } from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"

/**
 * Router Component
 * @constructor
 */
const Router: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback='Loading...'>
        <Switch>
          <Route
            path={routes.notFound.path}
            component={routes.notFound.component}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
