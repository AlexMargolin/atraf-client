import {
  LoginFunc,
  RegisterFunc,
  LoginResponse,
  RegisterResponse,
} from "./"
import { Handler } from "@/api"

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
    let registerResponse: RegisterResponse

    const response = await this.handler.post("/account/register", {
      email: params.email,
      password: params.password,
    })

    if (response.ok) {
      registerResponse = response.data as RegisterResponse
    }

    return [registerResponse, response]
  }

  /**
   * @param params
   * @return Promise<LoginResponse>
   */
  login: LoginFunc = async params => {
    let loginResponse: LoginResponse

    const response = await this.handler.post("/account/login", {
      email: params.email,
      password: params.password,
    })

    if (response.ok) {
      loginResponse = response.data as LoginResponse
    }

    return [loginResponse, response]
  }
}
