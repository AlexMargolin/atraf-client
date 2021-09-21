import {
  LoginFunc,
  ForgotFunc,
  RegisterFunc,
  ActivateFunc,
  LoginResponse,
  RegisterResponse,
  ActivateResponse,
} from "./";
import { Handler } from "@/api";
import AccountStore from "./store";

export default class Account extends AccountStore {
  protected handler: Handler;

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    super();
    this.handler = handler;
  }

  /**
   * @param params
   * @return Promise<[RegisterResponse, ResponseStatic]>
   */
  register: RegisterFunc = async params => {
    let registerResponse: RegisterResponse;

    const response = await this.handler.post("/account/register", {
      email: params.email,
      password: params.password,
    });

    if (response.ok) {
      registerResponse = response.data as RegisterResponse;
    }

    return [registerResponse, response];
  };

  /**
   * @param params
   * @return Promise<[ActivateResponse, ResponseStatic]>
   */
  activate: ActivateFunc = async params => {
    let activateResponse: ActivateResponse;

    const response = await this.handler.patch("/account/activate", {
      code: params.code,
    });

    if (response.ok) {
      activateResponse = response.data as ActivateResponse;
    }

    return [activateResponse, response];
  };

  /**
   * @param params
   * @return Promise<[LoginResponse, ResponseStatic]>
   */
  login: LoginFunc = async params => {
    let loginResponse: LoginResponse;

    const response = await this.handler.post("/account/login", {
      email: params.email,
      password: params.password,
    });

    if (response.ok) {
      loginResponse = response.data as LoginResponse;
    }

    return [loginResponse, response];
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
