import { ComponentPropsWithRef } from "react"
import { NavigationRoutes } from "@/router/routes"

export interface LinkProps extends ComponentPropsWithRef<"a"> {
  route?: NavigationRoutes
}
