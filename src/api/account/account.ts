import { Handler } from "@/api"
import { LoginFunc, RegisterFunc, ActivateFunc } from "./"

export default class Account {
  protected handler: Handler

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    this.handler = handler
  }

  /**
   * @param params
   * @return Promise<RegisterResponse>
   */
  register: RegisterFunc = async params => {
    const response = await this.handler.post("/account/register", {
      email: params.email,
      password: params.password,
    })

    return [null, response]
  }

  /**
   * @param params
   * @return Promise<LoginResponse>
   */
  login: LoginFunc = async params => {
    const response = await this.handler.post("/account/login", {
      email: params.email,
      password: params.password,
    })

    return [null, response]
  }

  /**
   * @param params
   * @return Promise<ActivateResponse>
   */
  activate: ActivateFunc = async params => {
    const response = await this.handler.patch("/account/activate", {
      code: params.code,
    })

    return [null, response]
  }
}
