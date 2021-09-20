import api from "@/api";
import { createContext, FC } from "react";

export const AccountContext = createContext(null);

const AccountProvider: FC = props => {
  const { children } = props;
  const account = api.account.getStore();

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
