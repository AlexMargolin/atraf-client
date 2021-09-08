import { Handler } from "@/api"
import {
  LoginFunc,
  LoginResponse,
  RegisterFunc,
  RegisterResponse,
} from "@/api/account/index"

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
   * @returns Promise<RegisterResponse>
   */
  register: RegisterFunc = async params => {
    const registerResponse: RegisterResponse = {
      user_id: null,
    }

    return registerResponse
  }

  /**
   * @param params
   * @returns Promise<LoginResponse>
   */
  login: LoginFunc = async params => {
    const loginResponse: LoginResponse = {
      access_token: null,
    }

    return loginResponse
  }
}
