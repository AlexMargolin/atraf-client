import { FC } from "react";
import { routes } from "@/router";
import { useAccount } from "@/providers/account";
import { Redirect, Route, RouteProps } from "react-router-dom";

/**
 * Public
 * Allows only logged-in accounts with any status
 */
const Public: FC<RouteProps> = props => {
  const [account] = useAccount();

  if (account) {
    return <Redirect to={routes.home.path} />;
  } else {
    return <Route {...props} />;
  }
};

export default Public;
