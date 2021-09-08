import {
  CreateFunc,
  UpdateFunc,
  ReadManyFunc,
  UpdateResponse,
  CreateResponse,
  ReadManyResponse,
} from "./"
import { Handler } from "@/api"

export default class Comments {
  protected handler: Handler

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    this.handler = handler
  }

  /**
   * @param params
   * @returns Promise<CreateResponse>
   */
  create: CreateFunc = async params => {
    const createResponse: CreateResponse = {
      comment_id: null,
    }

    // TODO implement Create Method...

    return createResponse
  }

  /**
   * @param params
   * @returns Promise<UpdateResponse>
   */
  update: UpdateFunc = async params => {
    const updateResponse: UpdateResponse = {
      comment_id: null,
    }

    // TODO implement Update Method...

    return updateResponse
  }

  /**
   * @param source_id
   * @returns Promise<ReadManyResponse>
   */
  readMany: ReadManyFunc = async source_id => {
    const readManyResponse: ReadManyResponse = {
      comments: [],
      users: [],
    }

    // TODO implement ReadMany Method...

    return readManyResponse
  }
}
