import api from "@/api";
import { CommentsProps } from "./";
import { makeClasses } from "@/hooks";
import { Comment } from "@/api/comments";
import { MappedUsers } from "@/api/users";
import modules from "./comments.module.scss";
import { FC, useEffect, useState } from "react";
import { Comment as CommentComponent, Editor } from "@/features";

const classes = makeClasses(modules);

export const classNames = {
  root: "comments",
  header: "comments__header",
  count: "comments__count",
  list: "comments__list",
};

const Comments: FC<CommentsProps> = props => {
  const { postId } = props;

  const [creating, setCreating] = useState(false);
  const [users, setUsers] = useState<MappedUsers>({});
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch Comments & Comments Users on initial load.
  // Since the API returns the users in an array structure,
  // we map it to a user_id:user object to improve lookup
  // performance when rendering the comments.
  useEffect(() => {
    (async () => {
      const [result, response] = await api.comments.readMany(postId);

      if (!response.ok) {
        return;
      }

      const usersMap: MappedUsers = {};
      for (const user of result.users) {
        usersMap[user.id] = user;
      }

      setUsers(usersMap);
      setComments(result.comments);
    })();
  }, [postId]);

  // handleSubmit creates a comment and updates the state with the
  // newly inserted comment.
  // if the comment author is not yet part of the users map,
  // the user will also be fetched and the state will be updated.
  const handleSubmit = async (value: string) => {
    setCreating(true);

    // create new comment
    const [{ comment }, response] = await api.comments.create({
      body: value,
      source_id: postId,
    });

    if (!response.ok) {
      return;
    }

    // fetch missing user
    // maybe should be replaced with the current using context
    if (!users[comment.user_id]) {
      const [{ user }, response] = await api.users.readOne(
        comment.user_id,
      );

      if (!response.ok) {
        return;
      }

      setUsers(Object.assign(users, { [user.id]: user }));
    }

    setComments([comment, ...comments]);
    setCreating(false);
  };

  return (
    <div className={classes(classNames.root)}>
      <Editor
        loading={creating}
        disabled={creating}
        submitLabel='Reply'
        onSubmit={handleSubmit}
      />

      <h2 className={classes(classNames.header)}>
        <strong className={classes(classNames.count)}>
          {comments.length}
        </strong>
        Comments
      </h2>

      <div className={classes(classNames.list)}>
        {comments.map(comment => (
          <CommentComponent
            data={comment}
            key={comment.id}
            user={users[comment.user_id]}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
