import HTTP from "../http"
import { AccountLoginFunc, AccountRegisterFunc } from "./"

export default class Account extends HTTP {
  constructor() {
    super()
  }

  /**
   * Create a New account using an email and password
   * returns http status 201 on success.
   *
   * @param email
   * @param password
   * @returns Promise<HTTPResponse>
   */
  register: AccountRegisterFunc = async (email, password) => {
    return this.Post("/account/register", { email, password })
  }

  /**
   * Attempt to login to an existing account.
   *
   * @param email
   * @param password
   * @returns Promise<HTTPResponse>
   */
  login: AccountLoginFunc = async (email, password) => {
    return this.Post("/account/login", { email, password })
  }
}
