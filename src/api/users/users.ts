import { Handler } from "@/api";
import { ReadOneFunc, ReadOneResponse } from "./";

export default class Users {
  protected handler: Handler;

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    this.handler = handler;
  }

  /**
   *
   * @param userId
   * @returns Promise<ReadOneResponse>
   */
  readOne: ReadOneFunc = async userId => {
    let readOneResponse: ReadOneResponse;

    const response = await this.handler.get(`/users/${userId}`);
    if (response.ok) {
      readOneResponse = response.data as ReadOneResponse;
    }

    return [readOneResponse, response];
  };
}
