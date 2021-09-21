import { User } from "@/api/users";
import { Comment } from "@/api/comments";

export type CommentProps = {
  comment: Comment;
  user: User;
};
