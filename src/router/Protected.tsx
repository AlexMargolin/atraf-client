import { FC } from "react";
import { routes } from "@/router";
import { useAccount } from "@/providers/account";
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  status: "any" | "active" | "inactive";
}

const Protected: FC<ProtectedRouteProps> = props => {
  const { status = "active", ...rest } = props;

  const [account] = useAccount();
  const authenticated = null !== account;

  if (!authenticated) {
    return <Redirect to={routes.login.path} />;
  }

  if ("active" === status && !account.active) {
    return <Redirect to={routes.activate.path} />;
  }

  if ("inactive" === status && account.active) {
    return <Redirect to={routes.home.path} />;
  }

  return <Route {...rest} />;
};

export default Protected;
