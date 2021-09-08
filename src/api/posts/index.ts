export type Post = {
  id: string
  user_id: string
  title: string
  body: string
  created_at: string
  updated_at: string
}

// PostFields is a struct representing all Post values
// which can be modified by the client.
export type PostFields = {
  title: string
  body: string
}

// Create
export type CreateRequest = PostFields
export type CreateResponse = { post_id: string }
export type CreateFunc = (
  params: CreateRequest,
) => Promise<CreateResponse>

// Update
export type UpdateRequest = PostFields
export type UpdateResponse = { post_id: string }
export type UpdateFunc = (
  postId: string,
  params: UpdateRequest,
) => Promise<UpdateResponse>

// ReadOne
export type ReadOneResponse = { post: Post; user: any }
export type ReadOneFunc = (postId: string) => Promise<ReadOneResponse>

// ReadMany
export type ReadManyResponse = {
  cursor: string
  posts: Post[]
  users: any
}
export type ReadManyFunc = (
  limit: number,
  cursor?: string,
) => Promise<ReadManyResponse>
