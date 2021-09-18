import { User } from "@/api/users";
import { ResponseStatic } from "@/api";

export type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  attachment: string;
  created_at: string;
  updated_at: string;
};

// PostFields is a struct representing all Post values
// which can be modified by the client.
export type PostFields = {
  title: string;
  body: string;
  attachment: File;
};

// Create
export type CreateRequest = PostFields;
export type CreateResponse = {
  post_id: string;
};
export type CreateFunc = (
  params: CreateRequest,
) => Promise<[CreateResponse, ResponseStatic]>;

// Update
export type UpdateRequest = PostFields;
export type UpdateResponse = {
  post_id: string;
};
export type UpdateFunc = (
  postId: string,
  params: UpdateRequest,
) => Promise<UpdateResponse>;

// ReadOne
export type ReadOneResponse = {
  post: Post;
  user: User;
};
export type ReadOneFunc = (
  postId: string,
) => Promise<[ReadOneResponse, ResponseStatic]>;

// ReadMany
export type ReadManyResponse = {
  cursor: string;
  posts: Post[];
  users: User[];
};
export type ReadManyFunc = (
  cursor?: string,
  limit?: number,
) => Promise<[ReadManyResponse, ResponseStatic]>;
