import { Post } from "@/api/posts";
import { User } from "@/api/users";
import { ComponentPropsWithRef } from "react";

export interface PostProps extends ComponentPropsWithRef<"div"> {
  post: Post;
  user: User;
}
