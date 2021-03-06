import { FC } from "react";
import { time } from "@/utils";
import { CommentProps } from "./";
import { makeClasses } from "@/hooks";
import modules from "./comment.module.scss";

const classes = makeClasses(modules);

const classNames = {
  root: "comment",
  header: "comment__header",
  avatar: "comment__avatar",
  author: {
    root: "comment__author",
    link: "comment__author-link",
    time: "comment__author-time",
  },
  body: "comment__body",
};

const Comment: FC<CommentProps> = props => {
  const { comment, user } = props;

  return (
    <div className={classes(classNames.root)}>
      <div className={classes(classNames.header)}>
        <img
          alt='My Picture %s'
          className={classes(classNames.avatar)}
          src='https://www.gravatar.com/avatar/e667fa431b98e1bb50bb42beb735ca9b'
        />

        <address className={classes(classNames.author.root)}>
          <a
            rel='author'
            href={`#${comment.id}`}
            className={classes(classNames.author.link)}
          >
            {user.nickname}
          </a>

          <time
            dateTime='%t'
            className={classes(classNames.author.time)}
          >
            {time(comment.created_at)}
          </time>
        </address>
      </div>

      <div className={classes(classNames.body)}>{comment.body}</div>
    </div>
  );
};

export default Comment;
