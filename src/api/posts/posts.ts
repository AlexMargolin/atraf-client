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
  protected HTTP: Handler

  /**
   * @param {Handler} handler
   */
  constructor(handler: Handler) {
    this.HTTP = handler
  }

  /**
   * @param params
   * @returns Promise<CreateResponse>
   */
  create: CreateFunc = async params => {
    const createResponse: CreateResponse = {
      post_id: null,
    }

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

    return updateResponse
  }

  /**
   * @param postId
   * @returns Promise<ReadOneResponse>
   */
  readOne: ReadOneFunc = async postId => {
    const readOneResponse: ReadOneResponse = {
      post: null,
      user: null,
    }

    return readOneResponse
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

    return getManyResponse
  }
}
