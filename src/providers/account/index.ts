import { Account } from "@/api/account";

export type AccountSetter = (account: Account) => void;
export type UseAccountHook = () => [Account, AccountSetter];

export { default as useAccount } from "./useAccount";
