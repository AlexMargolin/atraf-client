import { Handler } from "@/api";
import {
  LoginFunc,
  ForgotFunc,
  RegisterFunc,
  ActivateFunc,
} from "./";

export default class Account {
  protected handler: Handler;

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    this.handler = handler;
  }

  /**
   * @param params
   * @return Promise<[null, ResponseStatic]>
   */
  register: RegisterFunc = async params => {
    const response = await this.handler.post("/account/register", {
      email: params.email,
      password: params.password,
    });

    return [null, response];
  };

  /**
   * @param params
   * @return Promise<[null, ResponseStatic]>
   */
  login: LoginFunc = async params => {
    const response = await this.handler.post("/account/login", {
      email: params.email,
      password: params.password,
    });

    return [null, response];
  };

  /**
   * @param params
   * @return Promise<[null, ResponseStatic]>
   */
  activate: ActivateFunc = async params => {
    const response = await this.handler.patch("/account/activate", {
      code: params.code,
    });

    return [null, response];
  };

  /**
   * @param params
   * @return Promise<[null, ResponseStatic]>
   */
  forgot: ForgotFunc = async params => {
    const response = await this.handler.post("/account/forgot", {
      email: params.email,
    });

    return [null, response];
  };
}
