import { FC } from "react";
import Router from "@/router";
import { Snackbar } from "@/features";

const App: FC = () => (
  <>
    <Router />
    <Snackbar />
  </>
);

export default App;
