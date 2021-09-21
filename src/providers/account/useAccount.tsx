import { useContext } from "react";
import { UseAccountHook } from "./";
import { AccountContext } from "./provider";

const useAccount: UseAccountHook = () => {
  return useContext(AccountContext);
};

export default useAccount;
