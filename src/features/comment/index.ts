import { User } from "@/api/users"
import { Comment } from "@/api/comments"

export type CommentProps = {
  data: Comment
  user: User
  highlighted?: boolean
}

export { default as Skeleton } from "./skeleton"
