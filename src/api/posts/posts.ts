import {
  CreateFunc,
  UpdateFunc,
  ReadOneFunc,
  ReadManyFunc,
  CreateResponse,
  UpdateResponse,
  ReadOneResponse,
  ReadManyResponse,
} from "./"
import { Handler } from "@/api"

export default class Posts {
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
      post_id: null,
    }

    // TODO implement Create Method...

    return createResponse
  }

  /**
   * @param postId
   * @param params
   * @returns Promise<UpdateResponse>
   */
  update: UpdateFunc = async (postId, params) => {
    const updateResponse: UpdateResponse = {
      post_id: null,
    }

    // TODO implement Update Method...

    return updateResponse
  }

  /**
   * @param postId
   * @returns Promise<ReadOneResponse>
   */
  readOne: ReadOneFunc = async postId => {
    let readOneResponse: ReadOneResponse = {
      post: null,
      user: null,
    }

    const response = await this.handler.get(`/posts/${postId}`)

    if (response.ok) {
      readOneResponse = response.data as ReadOneResponse
    }

    return [readOneResponse, response]
  }

  /**
   * @param limit
   * @param cursor
   * @returns Promise<ReadManyResponse>
   */
  readMany: ReadManyFunc = async (limit, cursor) => {
    const getManyResponse: ReadManyResponse = {
      cursor: null,
      posts: [],
      users: [],
    }

    // TODO implement ReadMany Method...

    return getManyResponse
  }
}
