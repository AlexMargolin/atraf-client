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
    let createResponse: CreateResponse

    const response = await this.handler.post(`/comments`, {
      source_id: params.source_id,
      parent_id: params.parent_id,
      body: params.body,
    })
    if (response.ok) {
      createResponse = response.data as CreateResponse
    }

    return [createResponse, response]
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
    let readManyResponse: ReadManyResponse

    const response = await this.handler.get(`/comments/${source_id}`)
    if (response.ok) {
      readManyResponse = response.data as ReadManyResponse
    }

    return [readManyResponse, response]
  }
}
