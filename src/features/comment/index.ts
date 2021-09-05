export type CommentStatic = {
  id: string
  user_id: string
  post_id: string
  parent_id?: string
  body: string
  created_at: string
  updated_at?: string
}

export type CommentProps = {
  comment: CommentStatic
}
