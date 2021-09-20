import { Account } from "./";

export default class AccountStore {
  /**
   * @return string
   */
  protected getKey(): string {
    return "sid";
  }

  /**
   * @param {Account} data
   * @return void
   */
  protected setStore(data: Account): void {
    const key = this.getKey();

    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    this.resetStore();
  }

  /**
   * @return void
   */
  protected resetStore(): void {
    const key = this.getKey();

    localStorage.removeItem(key);
  }

  /**
   * @return {Account|null} data
   */
  public getStore(): Account {
    const key = this.getKey();
    const str = localStorage.getItem(key);

    if (null !== str) {
      return JSON.parse(str) as Account;
    }

    return null;
  }
}
