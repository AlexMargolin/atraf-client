import { AuthResponse } from "./";

export default class AccountStore {
  /**
   * @return string
   */
  protected getKey(): string {
    return "sid";
  }

  /**
   * @param {AuthResponse} data
   * @return void
   */
  protected setStore(data: AuthResponse): void {
    const key = this.getKey();

    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    this.resetStore();
  }

  /**
   * @return {AuthResponse|null} data
   */
  protected getStore(): AuthResponse {
    const key = this.getKey();
    const str = localStorage.getItem(key);

    if (null !== str) {
      return JSON.parse(str) as AuthResponse;
    }

    return null;
  }

  /**
   * @return void
   */
  protected resetStore(): void {
    const key = this.getKey();

    localStorage.removeItem(key);
  }
}
