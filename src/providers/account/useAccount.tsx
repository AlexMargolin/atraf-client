import { useContext } from "react";
import { Account } from "@/api/account";
import { AccountContext } from "./provider";

const useAccount = (): Account => {
  return useContext<Account>(AccountContext);
};

export default useAccount;
