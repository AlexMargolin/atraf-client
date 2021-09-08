export type Comment = {
  id: string
  user_id: string
  source_id: string
  parent_id?: string
  body: string
  created_at: string
  updated_at?: string
}

// CommentFields is a struct representing all Comment values
// which can be modified by the client.
export type CommentFields = {
  body: string
}

// Create
export interface CreateRequest extends CommentFields {
  source_id: string
  parent_id?: string
}

export type CreateResponse = { comment_id: string }
export type CreateFunc = (
  params: CreateRequest,
) => Promise<CreateResponse>

// Update
export type UpdateRequest = CommentFields
export type UpdateResponse = { comment_id: string }
export type UpdateFunc = (
  params: UpdateRequest,
) => Promise<UpdateResponse>

// ReadMany
export type ReadManyResponse = { comments: Comment[]; users: any }
export type ReadManyFunc = (
  source_id: string,
) => Promise<ReadManyResponse>
