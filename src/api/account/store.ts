import { AuthResponse } from "./";

export default class AccountStore {
  /**
   * @return string
   */
  private static getKey(): string {
    return "auth-store";
  }

  /**
   * @param {AuthResponse} data
   * @return void
   */
  protected setStore(data: AuthResponse): void {
    const key = AccountStore.getKey();

    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * @return {AuthResponse|null} data
   */
  static getStore(): AuthResponse {
    const key = AccountStore.getKey();
    const str = localStorage.getItem(key);

    if (null !== str) {
      return JSON.parse(str) as AuthResponse;
    }

    return null;
  }

  /**
   * @return void
   */
  static resetStore(): void {
    const key = AccountStore.getKey();

    localStorage.removeItem(key);
  }
}
