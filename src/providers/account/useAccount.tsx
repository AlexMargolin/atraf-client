import { useContext } from "react";
import { Account } from "@/api/account";
import { AccountContext } from "./provider";

export type AccountSetter = (account: Account) => void;
export type UseAccountHook = () => [Account, AccountSetter];

const useAccount: UseAccountHook = () => {
  return useContext(AccountContext);
};

export default useAccount;
