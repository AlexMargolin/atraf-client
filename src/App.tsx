import { FC } from "react";
import Router from "@/router";
import { Header } from "@/layout";
import { Snackbar } from "@/features";

const App: FC = () => {
  return (
    <>
      <Header />
      <Router />
      <Snackbar />
    </>
  );
};

export default App;
