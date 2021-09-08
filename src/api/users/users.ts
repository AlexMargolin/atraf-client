import { Handler } from "@/api"
import { ReadOneFunc, ReadOneResponse } from "./"

export default class Users {
  protected handler: Handler

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    this.handler = handler
  }

  /**
   *
   * @param userId
   * @returns Promise<ReadOneResponse>
   */
  readOne: ReadOneFunc = async userId => {
    const readOneResponse: ReadOneResponse = {
      user: null,
    }

    // TODO implement readOne Method...

    return readOneResponse
  }
}
