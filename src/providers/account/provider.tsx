import api from "@/api";
import { Account } from "@/api/account";
import { createContext, FC, useEffect, useState } from "react";

export const AccountContext = createContext(null);

const AccountProvider: FC = props => {
  const [account, setAccount] = useState<Account>(() => {
    // use store data as the initial provider value.
    return api.account.getStore();
  });

  // persist the data in local storage
  useEffect(() => {
    if (account) {
      api.account.setStore(account);
    } else {
      api.account.resetStore();
    }
  }, [account]);

  // catch api 401 responses and unset the user data
  useEffect(() => {
    const reset = () => setAccount(null);

    addEventListener("api.status.401", reset);
    return () => {
      removeEventListener("api.status.401", reset);
    };
  }, []);

  return (
    <AccountContext.Provider value={[account, setAccount]}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
